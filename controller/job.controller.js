import Job from "../models/job.model.js";

export const jobpost = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    // Log request body for debugging

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experienceLevel ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    const requirementsArray = Array.isArray(requirements)
      ? requirements
      : requirements.split(",").map((req) => req.trim());

    const job = await Job.create({
      title,
      description,
      requirements: requirementsArray,
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: Number(experienceLevel),
      position: Number(position),
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log("Error creating job:", error); // Log errors
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getjobbyid = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching job by ID:", error); // Log full error for debugging
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id; // Get the ID of the admin making the request
    const jobs = await Job.find({ created_by: adminId }) // Find jobs created by this admin
      .populate({
        path: "company", // Populate the 'company' field of the job with company details
        select: "name location logo", // Optionally, select only specific fields to populate
      })
      .sort({ createdAt: -1 }); // Sort the jobs by creation date, in descending order

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log("Error fetching admin jobs:", error); // Log the error for debugging
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
