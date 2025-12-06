// src/routes/alumniRoutes.js
const express = require("express");

const {
  completeProfile,
  updateProfile,
  addCompany,
  getResume,
} = require("../controllers/AlumniController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/profile", authenticate, completeProfile);
router.post("/update-profile", authenticate, updateProfile);

router.post("/add-company", authenticate, addCompany);

router.get("/student/:studentId/resume", getResume);

module.exports = router;

