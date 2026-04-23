const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const sessionRoutes = require("./routes/sessionRoutes");
const subjectRoutes = require("./routes/subjectRoutes");

require("./models/User");
require("./models/Subject");
require("./models/Session");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/sessions", sessionRoutes);
app.use("/api/subjects", subjectRoutes);

app.get("/", (req, res) => {
  res.json({ message: "StudySprint API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});