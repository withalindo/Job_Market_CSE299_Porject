import Employee from "../models/Employee.js";
import axios from "axios";
import fs from "node:fs";
import path from "node:path";
import pdfParse from "pdf-parse";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    const { username, summary, experiences } = req.body;
    let resumeFile = "";
    let generatedSummary = summary;
    let predictedSkills = "";

    if (req.file) {
      resumeFile = req.file.filename;
      const resumeDir = path.resolve(__dirname, "../ResumeUploads");
      const filePath = path.join(resumeDir, resumeFile);

      let resumeText = await extractResumeText(filePath);
      console.log("Extracted resume text:", resumeText);

      try {
        const predictionRes = await axios.post(
          "http://localhost:2001/predict",
          { text: resumeText }
        );
        console.log("Prediction API response:", predictionRes.data);
        predictedSkills = predictionRes.data.final_prediction || "";
        console.log("Predicted skills to save:", predictedSkills);
      } catch (err) {
        console.log("Error calling prediction API:", err.message);
        predictedSkills = "";
      }

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

    // Find employee by username only
    const employee = await Employee.findOne({ username });

    if (employee) {
      employee.skills = predictedSkills;
      employee.summary = generatedSummary || employee.summary;
      employee.experiences = experiences || employee.experiences;
      if (resumeFile) employee.resume = resumeFile;
      await employee.save();
      return res.status(200).json({ message: "Employee info updated successfully!", skills: employee.skills, summary: employee.summary });
    }

    // If not exist, create new employee with provided info
    const newEmployee = new Employee({
      username,
      skills: predictedSkills,
      summary: generatedSummary,
      experiences,
      resume: resumeFile,
    });
    await newEmployee.save();
    return res.status(201).json({ message: "Employee created and info saved!", skills: newEmployee.skills, summary: newEmployee.summary });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};