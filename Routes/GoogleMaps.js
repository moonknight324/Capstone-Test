// // issRoutes.js
// const express = require('express');
// const router = express.Router();

// router.get('/iss-location', async (req, res) => {
//  try {
//     const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
//     const data = await response.json();
//     res.json({ latitude: data.latitude, longitude: data.longitude });
//  } catch (error) {
//     console.error("Error fetching ISS location:", error.message);
//     res.status(500).send("Internal Server Error");
//  }
// });

// module.exports = router;
