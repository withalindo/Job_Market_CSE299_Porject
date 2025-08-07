import Employee from "../models/Employee.js";
import axios from "axios";
import fs from "node:fs";
import path from "node:path";
import pdfParse from "pdf-parse";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract text from PDF resume using pdf-parse
const extractResumeText = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (err) {
    console.log('Error extracting resume text: ', err);
    return "";
  }
};

export const uploadResume = async (req, res) => {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const { username, email, skills, summary, experiences } = req.body;
    let resumeFile = "";
    let generatedSummary = summary;

    if (req.file) {
      resumeFile = req.file.filename;
      // Use absolute path to ResumeUploads from project root
      const resumeDir = path.resolve(__dirname, "../ResumeUploads");
      const filePath = path.join(resumeDir, resumeFile);

      // Extract text from the uploaded PDF resume
      let resumeText = await extractResumeText(filePath);

      // Call Gemini LLM API for summary
      try {
        const geminiRes = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: `Summarize this resume:\n${resumeText}`
                  }
                ]
              }
            ]
          }
        );
        generatedSummary = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || summary || "";
      } catch {
        generatedSummary = summary || "";
      }
    }

    // Find employee by username and email
    const employee = await Employee.findOne({ username, email });

    if (employee) {
      employee.skills = skills || employee.skills;
      employee.summary = generatedSummary || employee.summary;
      employee.experiences = experiences || employee.experiences;
      if (resumeFile) employee.resume = resumeFile;
      await employee.save();
      return res.status(200).json({ message: "Employee info updated successfully!" });
    }

    // If not exist, create new employee with provided info
    const newEmployee = new Employee({
      username,
      email,
      skills,
      summary: generatedSummary,
      experiences,
      resume: resumeFile,
    });
    await newEmployee.save();
    return res.status(201).json({ message: "Employee created and info saved!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};