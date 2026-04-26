const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("../models/User");
const Subject = require("../models/Subject");
const Session = require("../models/Session");

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear old data
    await User.deleteMany();
    await Subject.deleteMany();
    await Session.deleteMany();

    // Create users
    const users = await User.insertMany([
      { name: "Sara Ali", email: "sara.ali@student.com", studyGoal: "Study 3 hours daily" },
      { name: "Alex Johansson", email: "alex.j@student.com", studyGoal: "Improve focus in math" },
      { name: "Maya Hassan", email: "maya.h@student.com", studyGoal: "Prepare for exams" },
      { name: "Lina Andersson", email: "lina.a@student.com", studyGoal: "Stay consistent daily" },
      { name: "Omar Khalid", email: "omar.k@student.com", studyGoal: "Finish assignments early" }
    ]);

    // Create subjects (linked to users)
    const subjects = await Subject.insertMany([
      { name: "Networking", difficultyLevel: 4, userId: users[0]._id },
      { name: "Programming", difficultyLevel: 5, userId: users[1]._id },
      { name: "Databases", difficultyLevel: 3, userId: users[2]._id },
      { name: "Mathematics", difficultyLevel: 5, userId: users[3]._id },
      { name: "Web Development", difficultyLevel: 4, userId: users[4]._id }
    ]);

    // Create sessions (linked to users + subjects)
    await Session.insertMany([
      { userId: users[0]._id,
        subjectId: subjects[0]._id,
        goal:"Review networking lecture slides",
        duration: 60,
        focusLevel: 4,
        energyLevel: 3,
        date: new Date()
      } ,
      { userId: users[1]._id,
        subjectId: subjects[1]._id,
        goal:"Practice JavaScript functions",
        duration: 90, 
        focusLevel: 5,
        energyLevel: 4, 
        date: new Date()
      },
      { userId: users[2]._id, 
        subjectId: subjects[2]._id,
        goal:"Finish database relationship exercises", 
        duration: 45, 
        focusLevel: 3, 
        energyLevel: 2, 
        date: new Date() 
      },
      { userId: users[3]._id, 
        subjectId: subjects[3]._id, 
        goal:"Solve matrix practice problems",
        duration: 120, 
        focusLevel: 5, 
        energyLevel: 5, 
        date: new Date() 
      },
      { userId: users[4]._id, 
        subjectId: subjects[4]._id, 
        goal:"Build React component layout",
        duration: 30, 
        focusLevel: 2, 
        energyLevel: 2, 
        date: new Date() 
      }
    ]);

    console.log("Seed data inserted!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();