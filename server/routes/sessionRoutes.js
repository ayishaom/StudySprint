const express = require("express");
const router = express.Router();

const {
  createSession,
  getSessions,
  updateSession,
  deleteSession,
  getPopulatedSession,
  getSessionsBySubject,
} = require("../controllers/sessionController");

// CRUD routes
router.post("/", createSession);
router.get("/", getSessions);
router.get("/populated", getPopulatedSession);
router.get("/subject/:subjectId", getSessionsBySubject);
router.put("/:id", updateSession);
router.delete("/:id", deleteSession);


module.exports = router;