const express = require("express");
const router = express.Router();

const { getSessionsBySubject } = require("../controllers/subjectController");

router.get("/:id/sessions", getSessionsBySubject);

module.exports = router;