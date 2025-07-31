import Employee from "../models/Employee.js";
import path from "path";      // ← add this

export const uploadResume = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const { username, skills, summary, experiences } = req.body;
  if (!username || !req.file) {
    return res.status(400).json({ message: "Username and resume are required" });
  }

  // multer saved file as <username>Resume.<ext>
  const resumeFilename = req.file.filename;            
  const resumeBase     = path.parse(resumeFilename).name; 

  try {
    const updated = await Employee.findOneAndUpdate(
      { username },
      {
        skills,
        summary,
        experiences,
        resume: resumeBase   
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Resume uploaded successfully",
      employee: updated
    });
  } catch (err) {
    console.error("uploadResume error:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};