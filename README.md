# MediCare Clinical Management System

A modern, responsive healthcare dashboard UI designed to help clinic administrators manage patients, appointments, and clinical records through a clean, professional interface.

## Live Demo

- **Live Application:** [View MediCare](https://medicare-clinical-management.vercel.app/login)
- **GitHub Repository:** [medicare-clinical-management](https://github.com/pheba-ss/medicare-clinical-management)

## Features

- **Login:** Email/username and password fields, form validation, and password visibility toggle.
- **Forgot Password:** Password-reset request interface with input validation and feedback.
- **Dashboard:** Summary cards and a clinical overview using sample data.
- **Patient Management:** Patient listing and management interface.
- **Appointment Management:** Appointment overview and scheduling interface.
- **Clinical Records:** Clinical record management interface.
- **Notifications:** Notification dropdown with unread indicators and mark-as-read functionality.
- **Admin Menu:** Account settings and sign-out options.
- **Responsive Design:** Layout designed for desktop, tablet, and mobile screens.

## Technologies Used

- React.js
- JavaScript
- Tailwind CSS
- React Router DOM
- Lucide React
- Git and GitHub
- Vercel

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm before running the project locally.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pheba-ss/medicare-clinical-management.git
   ```

2. Navigate to the project directory:

   ```bash
   cd medicare-clinical-management
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To create an optimized production build, run:

```bash
npm run build
```

The generated production files will be placed in the `build` directory.

## Project Structure

```text
clinical-management/
├── public/
│   ├── index.html
│   ├── medicare-icon.svg
│   └── ...
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── package.json
└── README.md
```

## Deployment

The application is deployed on Vercel and connected to the GitHub repository for automated deployments.

To deploy updates, commit and push your changes to the connected production branch. Vercel can then build and deploy the updated application automatically.

## Important Note

This project is a frontend demonstration. Login, password-reset, and dashboard functionality use client-side behavior and sample data unless a backend service is separately configured. Real authentication, secure session management, and password-reset emails require backend integration.

## Author

**Pheba SS**

- GitHub: [pheba-ss](https://github.com/pheba-ss)