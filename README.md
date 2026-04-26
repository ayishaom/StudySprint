📘 StudySprint
🧠 Overview

StudySprint is a full-stack study tracking application that helps students monitor and improve their study sessions by tracking focus, energy levels, duration, and specific goals for each session.

The application allows users to record what they plan to accomplish during each session, making studying more structured and intentional.

🎯 Problem Statement

Students often struggle to stay focused and track their study progress. StudySprint solves this by allowing users to log structured study sessions with clear goals and performance metrics.

⚙️ Tech Stack
Frontend: React (Vite)
Backend: Express.js
Database: MongoDB Atlas
Tools: Node.js, Mongoose, Concurrently

📊 Features
Create, read, update, and delete study sessions
Track session goal, duration, focus level, and energy level
Relational data (users, subjects, sessions)
Filter sessions by focus level
Auto-refresh session data
Loading and error states in UI
Realistic seeded data

🗄️ Database Structure

Collections:

Users
Subjects
Sessions

Relationships:

Session → User (userId)
Session → Subject (subjectId)

Each session includes a custom field:

goal (what the user wants to accomplish)
🚀 Getting Started
1. Clone the repository
git clone https://github.com/ayishaom/StudySprint.git
cd StudySprint

2. Install dependencies
Root (for concurrently)
npm install
Server
cd server
npm install
Client
cd ../client
npm install

3. Environment variables

Create a .env file inside the server folder:

MONGO_URI=your_mongodb_connection_string
PORT=5000

4. Seed the database

From the server folder:

node seed/seedData.js

5. Run the application

From the root folder:

npm run dev

🌐 Access the app

Frontend:

http://localhost:5173

(or 5174 if port is in use)

Backend:

http://localhost:5000/api/sessions


🔄 Example API Endpoints
Create Session
POST /api/sessions
Get Sessions
GET /api/sessions
Update Session
PUT /api/sessions/:id
Delete Session
DELETE /api/sessions/:id


💡 Future Improvements
Replace ID inputs with dropdown selections
Add authentication
Add analytics (e.g., total study time)
Improve UI design
Author

Ayisha Omer

📌 Notes
The application uses realistic seed data
Designed to demonstrate full-stack understanding
Built to satisfy DA219B Fullstack Lab requirements