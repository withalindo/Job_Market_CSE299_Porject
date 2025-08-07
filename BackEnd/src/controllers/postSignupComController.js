import fs from "node:fs";
import path from "node:path";
import Company from "../models/Company.js";

export const addCompanyInfo = async (req, res) => {
  try {
    let { companyName, email, phoneNumber, address, district, description } = req.body;
    let companyLogo = "";

    // Check if company exists by email or companyName
    let existing = null;
    if (email) {
      existing = await Company.findOne({ email });
    }
    if (!existing && companyName) {
      existing = await Company.findOne({ companyName });
    }

    // Handle file upload
    if (req.file) {
      const ext = req.file.originalname.split('.').pop();
      const safeCompanyName = (companyName || "Company").replace(/[^a-zA-Z0-9]/g, "");
      const newFilename = `${safeCompanyName}Image.${ext}`;
      const oldPath = req.file.path;
      const newPath = path.join(req.file.destination, newFilename);
      fs.renameSync(oldPath, newPath);
      companyLogo = newFilename;
    }

    if (existing) {
      // Update only the extra fields
      existing.phoneNumber = phoneNumber;
      existing.address = address;
      existing.district = district;
      existing.description = description;
      if (companyLogo) existing.companyLogo = companyLogo;
      await existing.save();
      return res.status(200).json({ message: "Company info updated successfully!" });
    }

    // If company does not exist, create new
    const company = new Company({
      companyName,
      email,
      phoneNumber,
      address,
      district,
      description,
      companyLogo,
    });

    await company.save();
    res.status(201).json({ message: "Company info added successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};