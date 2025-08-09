import Job from "../models/Job.js";
import Company from "../models/Company.js";

// Get all jobs, with optional search and category filter, and attach companyLogo and companyName
export const getJobs = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ];
    }
    if (category && category !== "All") {
      filter.category = category;
    }

    const jobs = await Job.find(filter).sort({ postedAt: -1 });

    // Attach companyLogo and companyName to each job
    const jobsWithLogo = await Promise.all(jobs.map(async job => {
      const company = await Company.findOne({ companyName: job.company });
      return {
        ...job.toObject(),
        companyLogo: company?.companyLogo || "",
        companyName: company?.companyName || job.company || "Company Name"
      };
    }));

    res.json(jobsWithLogo);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};