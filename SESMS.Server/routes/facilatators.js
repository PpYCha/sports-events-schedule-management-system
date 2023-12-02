const express = require("express");
const router = express.Router();
const Facilatator = require("../models/facilatator");
const verifyToken = require("../middleware/authMiddleware");

// Getting all
router.get("/", async (req, res) => {
  try {
    const facilatators = await Facilatator.find();
    res.json(facilatators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Getting one
router.get("/:id", getFacilatator, (req, res) => {
  console.log("res:", res);
  res.json(res.facilatator);
});
// Creating one
router.post("/", async (req, res) => {
  const facilatator = new Facilatator({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    facilitatorRole: req.body.facilitatorRole,
    sportsEvent: req.body.sportsEvent,
  });
  try {
    const newFacilatator = await facilatator.save();
    res.status(201).json(newFacilatator);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Updating One
router.patch("/:id", getFacilatator, async (req, res) => {
  if (req.body.firstName != null) {
    res.facilatator.firstName = req.body.firstName;
  }
  if (req.body.lastName1 != null) {
    res.facilatator.lastName = req.body.lastName;
  }
  if (req.body.facilitatorRole != null) {
    res.facilatator.facilitatorRole = req.body.facilitatorRole;
  }
  if (req.body.sportsEvent != null) {
    res.facilatator.sportsEvent = req.body.sportsEvent;
  }
  try {
    const updatedFacilator = await res.facilatator.save();
    res.json(updatedFacilator);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one
router.delete("/:id", getFacilatator, async (req, res) => {
  try {
    console.log(res.facilatator);
    await res.facilatator.deleteOne();
    res.json({ message: "Deleted Facilatator" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getFacilatator(req, res, next) {
  let facilatator;
  try {
    facilatator = await Facilatator.findById(req.params.id);
    if (facilatator == null) {
      return res.status(404).json({ message: "Cannot find facilatator" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.facilatator = facilatator;

  next();
}

module.exports = router;
