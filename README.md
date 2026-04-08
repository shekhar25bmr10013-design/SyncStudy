# SyncStudy – Study Together. Stay Consistent.

## Problem

Students waste 10-30 minutes finding study partners on WhatsApp, Discord, or Telegram. There is no accountability, which leads to procrastination and inconsistent study habits.

## Solution

SyncStudy is a real-time study collaboration platform. With one tap, students can instantly join or create study sessions. It includes synced timers, real-time chat, and accountability features to keep everyone focused.

From app open to studying in under 5 seconds.

## Features

One-tap session join or create
Synced Pomodoro timer for all participants
Real-time chat for in-session communication
Participant tracking to see who is active or away
Accountability check-ins every 10 minutes
Extend session option up to 3 times
Dark theme for night study
Responsive design for mobile and desktop

## Tech Stack

Frontend: React, Vite, Tailwind CSS
Backend: Node.js, Express.js
Database: SQLite
Real-time: Socket.io
Authentication: JWT, bcryptjs

## Project Structure

SyncStudy/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── services/
│   └── package.json
└── backend/
    ├── controllers/
    ├── routes/
    ├── models/
    ├── sockets/
    ├── middleware/
    ├── config/
    ├── server.js
    ├── app.js
    └── package.json

## Installation

First, clone the repository:
git clone https://github.com/yourusername/syncstudy.git
cd syncstudy

For backend:
cd backend
npm install
Create a .env file with PORT=5000, JWT_SECRET=your_secret_key, JWT_EXPIRE=7d
npm run dev
Backend runs on http://localhost:5000

For frontend:
Open a new terminal
cd frontend
npm install
npm run dev
Frontend runs on http://localhost:3000

Open your browser and go to http://localhost:3000

## How to Use

1. Click Get Started on the landing page
2. Register with your name, email, and password
3. Login with your credentials
4. Click Start / Join Sync Session
5. Enter subject and select duration
6. Click Create & Start
7. Click Ready to Study button
8. Click Play to start the timer
9. Use chat to talk with other participants
10. Click + button to extend session if needed
11. Respond to the Still studying? popup every 10 minutes

## API Endpoints

POST /api/auth/register - Register new user
POST /api/auth/login - Login user
POST /api/session/join - Create or join a session
POST /api/session/ready - Mark user as ready
POST /api/session/extend - Extend session duration
GET /api/session/:id - Get session details

## Socket Events

joinRoom - Join a session room
sendMessage - Send a chat message
receiveMessage - Receive a new message
userActive - Mark user as active
userInactive - Mark user as inactive
sessionStarted - Timer sync started
sessionExtended - Timer extended
userJoined - New user joined the session

## Future Scope

AI-based study partner matching
Productivity analytics dashboard
Mobile app for iOS and Android
Push notifications
Gamification and study streaks
Cross-university platform
Study material sharing
Peer tutoring marketplace
Blockchain study credentials
NFT rewards for consistency

## team

shekhar rajput --> 25bmr10013
khushi purwar --> 25bce10021
ayush prakasj --> 25mei10129

Hackathon: VibeHack 2026


## License

MIT License - Copyright (c) 2026 SyncStudy Team

Acknowledgments

VibeHack 2026 organizers
Open source community
All beta testers

Contact

Email: team@syncstudy.com
GitHub: github.com/syncstudy
LinkedIn: linkedin.com/company/syncstudy

Made with love for VibeHack 2026

SyncStudy – Study Together. Stay Consistent.
