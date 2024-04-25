const express = require("express");

const history = require("../models/history.schema");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const spaceHistory = await history.findOne();
    if (!spaceHistory) {
      throw new Error("No history found.");
    }
    res.send(spaceHistory.history);
  } catch (error) {
    console.error("Error : ", error.message);
    res.status(500).send("Internal Server Error");
  }   
});

module.exports = router