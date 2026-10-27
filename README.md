# MediCare – Clinical Management System

## About the Project

MediCare is a clinical management application built with React.js and Tailwind CSS. It provides a modern, responsive interface for login, password recovery, and managing clinical information through a dashboard.

The dashboard displays sample patient information, appointments, and clinical records to demonstrate the application's user interface and navigation.

## Technologies Used

- React.js
- JavaScript
- Tailwind CSS
- Lucide React
- React Router DOM
- Git and GitHub
- Vercel (Deployment)

## Features

- **Login Page**
  - Email validation
  - Required-field validation
  - Password visibility toggle
  - Error messages for invalid input

- **Forgot Password**
  - Email validation
  - Form submission feedback
  - Password reset confirmation message

- **Clinical Dashboard**
  - Summary cards for patients, appointments, doctors, and pending reviews
  - Appointment table with sample data
  - Sidebar navigation
  - Dynamic page titles and subtitles

- **Patients**
  - View and search patient information
  - Add and manage sample patient records

- **Appointments**
  - View and search appointments
  - Schedule appointments using sample data
  - Update appointment status

- **Clinical Records**
  - View and search clinical records
  - Review sample clinical information

- **Settings**
  - Manage sample profile and clinic information
  - Configure notification preferences

- **Notifications and Admin Menu**
  - View sample notifications
  - Mark notifications as read
  - Access account settings
  - Open the sign-out confirmation dialog

- **Responsive Design**
  - Layout adapts to desktop, tablet, and mobile screens

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Visual Studio Code (recommended)

### Installation

1. Clone the repository or download the project files.

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory.

   ```bash
   cd clinical-management
   ```

3. Install the project dependencies.

   ```bash
   npm install
   ```

4. Start the development server.

   ```bash
   npm start
   ```

5. Open the local URL displayed in your terminal, usually:

   `http://localhost:3000`

## Project Structure

```text
clinical-management/
├── public/
├── src/
│   ├── components/
│   │   ├── Brand.js
│   │   ├── Sidebar.js
│   │   ├── Header.js
│   │   ├── StatCard.js
│   │   └── AppointmentTable.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── ForgotPassword.js
│   │   ├── Dashboard.js
│   │   ├── Patients.js
│   │   ├── Appointments.js
│   │   ├── ClinicalRecords.js
│   │   └── Settings.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
└── README.md
```

*Note: The file structure above reflects the intended organization. Adjust it if your actual project differs.*

## Project Links

- **GitHub Repository:** 
- **Live Demo:** 

## Important Note

This project is a frontend demonstration and currently uses sample data. Login, password recovery, notifications, and other interactions are implemented for UI demonstration purposes.

Real authentication, email-based password recovery, persistent data storage, and live notifications require appropriate backend services and integration.

## License

This project was developed for educational and demonstration purposes.
