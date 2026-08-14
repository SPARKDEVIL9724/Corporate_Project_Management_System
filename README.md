# Corporate Project Management System

A full-stack web application designed to help organizations manage projects, tasks, and users from a centralized platform.

The application provides a structured system for organizing projects, assigning and managing tasks, and handling user-related functionality through a modern frontend and backend architecture.

## 🚀 Features

* User account management
* Project creation and management
* Task creation and tracking
* Organized project-task workflow
* Separate frontend and backend architecture
* API-based communication between frontend and backend
* Modern React-based user interface


## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Axios
* ESLint

### Backend

* Python
* Django
* Django applications for:

  * Accounts
  * Projects
  * Tasks


## 📁 Project Structure

```text
Corporate_Project_Management_System/
│
├── backend/
│   ├── accounts/          # User and account-related functionality
│   ├── backend/           # Django project configuration
│   ├── projects/          # Project management functionality
│   ├── tasks/             # Task management functionality
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── .gitignore
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

* Python
* Node.js
* npm

## 🔧 Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

### Windows

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
source venv/bin/activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Run database migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

The backend server should now be running locally.

## 💻 Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL where you can access the application.


## 🔗 Running the Full Application

To run the complete application:

1. Start the Django backend server.
2. Start the React frontend server.
3. Open the frontend URL provided by Vite in your browser.
4. The frontend communicates with the backend API to manage application data.


## 📜 Available Frontend Scripts

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## 🎯 Project Modules

### Accounts

Handles user and account-related functionality.

### Projects

Responsible for creating, organizing, and managing projects.

### Tasks

Handles task-related functionality and project task management.

## 🔮 Future Improvements

Possible future enhancements include:

* Role-based access control
* Task assignment to team members
* Task priorities and deadlines
* Project progress tracking
* Dashboard and analytics
* Notifications
* File attachments
* Search and filtering
* Deployment configuration

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add your feature"
```

5. Push the branch.

```bash
git push origin feature/your-feature-name
```

6. Create a Pull Request.

## 📄 License

This project is currently intended for educational and development purposes.

## 👨‍💻 Author

Rishi Agarwal

- GitHub: [SPARKDEVIL9724](https://github.com/SPARKDEVIL9724)

⭐ If you find this project useful, consider giving it a star!
