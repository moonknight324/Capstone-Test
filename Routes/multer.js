const express = require("express");
const multer = require("multer");
const router = express.Router();
const cloudinary = require("../config/cloudinaryconfig");
const moment = require("moment");
const users = require("../models/postSchema");

// Multer configuration for file uploads
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

const upload = multer({
  storage: imgconfig,
}).array("photos", 5); // Handle multiple files with the field name "photos"

// Route for registering a new user with uploaded images
router.post("/register", upload, async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files provided" });
  }

  try {
    // Upload each file to Cloudinary and gather the resulting URLs
    const uploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path)
    );
    const uploadResults = await Promise.all(uploadPromises);
    const imgpaths = uploadResults.map((result) => result.secure_url);

    // Extract data from the request body
    const { name, caption, description,email } = req.body;
    const date = moment(new Date()).format("YYYY-MM-DD");

    // Create a new user object with the uploaded image URLs
    const userdata = new users({
      name: name,
      caption: caption,
      description: description,
      imgpath: imgpaths, // Store the image paths in the 'imgpath' field
      date: date,
      email: email,
    });

    // Save the user data to the database
    await userdata.save();
    res.status(200).json(userdata);
  } catch (err) {
    console.error("Error saving user data:", err);
    res.status(400).json(err);
  }
});



// Route for retrieving user data
router.get("/getdata", async (req, res) => {
  try {
    const getUser = await users.find();
    res.status(200).json(getUser);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(400).json(error);
  }
});

// Add a route for deleting user data
router.delete("/delete/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID and delete it from the database
    await users.findByIdAndDelete(userId);
    res.status(200).json({ message: "User data deleted successfully" });
  } catch (error) {
    console.error("Error deleting user data:", error);
    res.status(400).json(error);
  }
});


module.exports = router;
