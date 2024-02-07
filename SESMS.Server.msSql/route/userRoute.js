const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

// GET route to retrieve all users
router.get("/", async (req, res) => {
  try {
    const notes = await userModel.index(); // Implement this function in userModel.js
    res.json(notes);
    // res.send("Hello from note route!");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
