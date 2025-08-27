# 🎯 Habit Tracker

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16.3-green.svg)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.15-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

> A comprehensive habit tracking application that helps users build and maintain positive habits, set goals, track progress, and maintain a personal diary. Built with modern web technologies and featuring a responsive, intuitive interface. **This project is part of my professional portfolio to demonstrate my development skills and practices.**

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Technologies](#️-technologies)
- [📦 Installation](#-installation)
- [🎮 Usage](#-usage)
- [🏗️ Project Structure](#️-project-structure)
- [🔧 API Endpoints](#-api-endpoints)
- [🧪 Testing](#-testing)
- [📄 License](#-license)

## ✨ Features

### 🎯 Core Functionality
- **Habit Management**: Create, edit, and delete personal habits with customizable categories
- **Progress Tracking**: Mark habits as completed or missed on any given date
- **Goal Setting**: Set custom goals for habits with specific timeframes and objectives
- **Progress Visualization**: View detailed progress reports and statistics
- **Personal Diary**: Maintain daily entries and reflections
- **User Authentication**: Secure login and registration system with JWT tokens

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Immediate feedback and updates when marking progress
- **Date-based Tracking**: Track habits for specific dates with visual indicators
- **Category Organization**: Organize habits by categories for better management
- **Progress Analytics**: View completion rates and progress over time



## 🛠️ Technologies

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://reactjs.org/) | 18.2.0 | UI Framework |
| [React Router DOM](https://reactrouter.com/) | 6.28.0 | Client-side routing |
| [Vite](https://vitejs.dev/) | 4.4.5 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.15 | Styling framework |
| [PostCSS](https://postcss.org/) | 8.4.49 | CSS processing |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| [Node.js](https://nodejs.org/) | Latest | Runtime environment |
| [Express.js](https://expressjs.com/) | 4.21.1 | Web framework |
| [MongoDB](https://mongodb.com/) | Latest | Database |
| [Mongoose](https://mongoosejs.com/) | 8.16.3 | ODM for MongoDB |
| [JWT](https://jwt.io/) | 9.0.2 | Authentication |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js/) | 2.4.3 | Password hashing |

### Development Tools
- **ESLint**: Code linting and quality assurance
- **Jest**: Testing framework for backend logic
- **Dotenv**: Environment variable management

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/habit-tracker.git
   cd habit-tracker
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd api
   npm install
   
   # Install frontend dependencies
   cd ../app
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # In the api directory, create a .env file
   cd ../api
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=3001
   MONGO_URL=mongodb://localhost:27017/habit-tracker
   JWT_SECRET=your-secret-key-here
   ```

4. **Start the development servers**
   ```bash
   # Start backend server (from api directory)
   npm start
   
   # Start frontend server (from app directory, in a new terminal)
   cd ../app
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 🎮 Usage

### Getting Started
1. **Register/Login**: Create an account or sign in with existing credentials
2. **Create Habits**: Add your first habit with a name and category
3. **Track Progress**: Mark habits as completed or missed daily
4. **Set Goals**: Create goals for your habits with specific timeframes
5. **Monitor Progress**: View your progress and statistics

### Key Features Usage

#### Creating a Habit
```javascript
// Example: Creating a new habit
const newHabit = {
  name: "Morning Exercise",
  category: "Health",
  description: "30 minutes of cardio"
};
```

#### Tracking Progress
```javascript
// Example: Marking a habit as completed
await addProgress(userId, habitId, date, 'done');
```

## 🏗️ Project Structure

```
habit-tracker/
├── 📁 app/                    # Frontend React application
│   ├── 📁 src/
│   │   ├── 📁 view/          # React components and pages
│   │   │   ├── 📁 components/ # Reusable UI components
│   │   │   ├── 📁 hooks/     # Custom React hooks
│   │   │   └── 📁 library/   # UI component library
│   │   ├── 📁 logic/         # Frontend business logic
│   │   └── 📁 util/          # Utility functions
│   ├── 📁 public/            # Static assets
│   └── package.json
├── 📁 api/                    # Backend Node.js/Express server
│   ├── 📁 logic/             # Business logic and data operations
│   │   ├── 📁 habits/        # Habit-related operations
│   │   ├── 📁 goals/         # Goal-related operations
│   │   ├── 📁 progress/      # Progress tracking operations
│   │   ├── 📁 users/         # User management operations
│   │   └── 📁 events/        # Event management operations
│   ├── 📁 routes/            # API route handlers
│   ├── 📁 test/              # API test scripts
│   └── package.json
├── 📁 dat/                    # Database models and connection
├── 📁 com/                    # Shared utilities and validation
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /users/register` - Register a new user
- `POST /users/login` - Authenticate user
- `GET /users/profile` - Get user profile

### Habits
- `GET /habits` - Get all habits for user
- `POST /habits` - Create a new habit
- `PUT /habits/:id` - Update a habit
- `DELETE /habits/:id` - Delete a habit

### Progress
- `GET /progress` - Get progress for habits
- `POST /progress` - Track habit progress
- `PUT /progress/:id` - Update progress entry
- `DELETE /progress/:id` - Delete progress entry

### Goals
- `GET /goals` - Get all goals for user
- `POST /goals` - Create a new goal
- `PUT /goals/:id` - Update a goal
- `DELETE /goals/:id` - Delete a goal

## 🧪 Testing

### Running Tests
```bash
# Run all backend tests
cd api
npm run specs

# Run specific test suites
npm run specs:users
npm run specs:habits
npm run specs:goals
npm run specs:events
npm run specs:progress
```

### Test Coverage
- ✅ User authentication and management
- ✅ Habit CRUD operations
- ✅ Progress tracking functionality
- ✅ Goal management
- ✅ Event handling
- ✅ Error handling and validation





## 📄 License

This project is proprietary software. All rights reserved. This code is made publicly available solely for portfolio demonstration purposes. See the [LICENSE](LICENSE) file for full terms and restrictions.

---

<div align="center">
  <p>
    <a href="#-habit-tracker">Back to top</a>
  </p>
</div>
