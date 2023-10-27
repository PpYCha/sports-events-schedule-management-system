const express = require("express");
const router = express.Router();
const Facilatator = require("../models/facilatator");
const facilatator = require("../models/facilatator");

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
    role: req.body.role,
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
  if (req.body.role != null) {
    res.facilatator.role = req.body.role;
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
