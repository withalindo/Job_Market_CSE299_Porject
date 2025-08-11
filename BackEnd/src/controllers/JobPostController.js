import Job from "../models/Job.js";

export const postJob =async (req, res) => {

    try 
    {
        const { title, company, description, category, location, Salary } = req.body;

        const job = new Job({
            title,
            company,
            description,
            category,
            location,
            Salary
        });

        await job.save();
        res.status(201).json({ message: "Job posted successfully", job });


    }
    catch (error) {
        res.status(500).json({ message: "Failed to post job", error });
        console.error("Error posting job:", error);
    }
    
}