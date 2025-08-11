
import Employee from "../models/Employee.js";
import Job from "../models/Job.js";
import Company from "../models/Company.js";

export const getHomeUserInfo = async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).json({});
    const employee = await Employee.findById(req.session.user);
    if (!employee) return res.status(404).json({});
    res.json({
      fullname: employee.fullname,
      profileImage: employee.profileImage,
      skills: employee.skills,
      summary: employee.summary,
    });
  } catch (err) {
    res.status(500).json({});
  }
};



//Fetching all the jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 });
    res.json(jobs);
    
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
    console.error("Error in retrieving all jobs:", error);
  }
};


//Fetching all the employees
export const getAllEmployees = async (req, res) => {

try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employees" });
    console.error("Error in retrieving all employees:", error);
  }
};

// TOP JOBS: Return all jobs with company info attached
export const getTopJobs = async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).json([]);
    const jobs = await Job.find().sort({ postedAt: -1 });

    // Attach companyName and companyLogo to each job
    const jobsWithCompany = await Promise.all(jobs.map(async job => {
      const company = await Company.findOne({ companyName: job.company });
      return {
        ...job.toObject(),
        companyName: company?.companyName || job.company || "Company Name",
        companyLogo: company?.companyLogo || ""
      };
    }));

    res.json(jobsWithCompany);
  } catch (err) {
    res.status(500).json([]);
  }
};

export const getJobsForYou = async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).json([]);
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json([]);
  }
};

export const getTopEmployees = async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).json([]);
    const user = await Employee.findById(req.session.user);
    if (!user || !user.skills) return res.json([]);

    let skillsRegexArr = [];
    if (Array.isArray(user.skills)) {
      skillsRegexArr = user.skills
        .filter(skill => skill && skill.trim() !== "")
        .map(skill => new RegExp(skill, "i"));
    } else if (typeof user.skills === "string" && user.skills.trim() !== "") {
      skillsRegexArr = [new RegExp(user.skills, "i")];
    }

    const employees = await Employee.find({
      skills: { $in: skillsRegexArr }
    }).sort({ createdAt: -1 }).limit(5);

    res.json(employees);
  } catch (err) {
    res.status(500).json([]);
  }
};

// TOP JOBS: Return jobs whose category matches any skill of the logged-in employee
export const getTopJobsBySkills = async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).json([]);
    const employee = await Employee.findById(req.session.user);
    if (!employee || !employee.skills) return res.json([]);

    let skillsArr = [];
    if (Array.isArray(employee.skills)) {
      skillsArr = employee.skills.filter(skill => skill && skill.trim() !== "");
    } else if (typeof employee.skills === "string" && employee.skills.trim() !== "") {
      skillsArr = [employee.skills];
    }

    const jobs = await Job.find();
    // Filter jobs where job.category matches any skill
    const filteredJobs = jobs.filter(job =>
      job.category && skillsArr.some(skill => job.category.toLowerCase().includes(skill.toLowerCase()))
    );
    res.json(filteredJobs);
  } catch (err) {
    res.status(500).json([]);
  }
};