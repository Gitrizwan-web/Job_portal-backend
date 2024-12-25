import Company from "../models/company.model.js"; // Import the Company model
import getDataUri from "../utilz/datauri.js";
import cloudinary from "cloudinary";
// Register a company
export const registercompany = async (req, res) => {
  try {
    const { companyname } = req.body;

    if (!companyname) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    let existingCompany = await Company.findOne({ name: companyname }); // Corrected model usage
    if (existingCompany) {
      return res.status(400).json({
        message: "You can't register the same company.",
        success: false,
      });
    }

    const newCompany = await Company.create({
      name: companyname,
      userId: req.id,
    });

    return res.status(200).json({
      message: "Company has been created",
      company: newCompany,
      success: true,
    });
  } catch (error) {
    console.error(error); // Log errors for debugging
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Get companies by user ID
export const getcompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Get a company by ID
export const getcompanyid = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId); // Corrected model usage

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    // Check if the file exists
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      const logo = cloudResponse.secure_url;

      // Update the company information with the new logo
      const updateData = { name, description, website, location, logo };

      const company = await Company.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
        }
      );

      if (!company) {
        return res.status(404).json({
          message: "Company not found.",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Company information updated.",
        success: true,
      });
    } else {
      // If no file uploaded, just update other fields
      const updateData = { name, description, website, location };

      const company = await Company.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
        }
      );

      if (!company) {
        return res.status(404).json({
          message: "Company not found.",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Company information updated without logo.",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while updating company.",
      success: false,
      error: error.message,
    });
  }
};
