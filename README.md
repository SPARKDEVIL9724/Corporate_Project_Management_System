# Corporate Project Management System

A full-stack web application designed to help organizations manage projects, tasks, and users from a centralized platform.

The application provides user authentication, role-based authorization, project management, and task management through a modern React frontend and Django REST Framework backend.

## 🚀 Live Demo

* **Frontend:** [Corporate Project Management System](https://corporate-project-management-system.vercel.app)
* **Backend API:** [Corporate Project Management System API](https://corporateprojectmanagementsystem-production.up.railway.app)

---

## ✨ Features

### Authentication & Users

* User registration and login
* JWT-based authentication
* Access and refresh tokens
* Automatic access token refresh
* User profile management
* Protected API endpoints

### Authorization

* Role-based access control
* Manager-specific permissions
* Managers can create, update, and delete projects
* Authenticated users have controlled access based on their role and project membership

### Project Management

* Create, view, update, and delete projects
* Project membership support
* Managers can view all projects
* Users can access projects they are members of

### Task Management

* Create and manage tasks
* Organize tasks under projects
* Track project-related work

### Deployment

* Frontend deployed on Vercel
* Backend deployed on Railway
* PostgreSQL database hosted on Railway

---

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
* Django REST Framework
* Simple JWT
* Django CORS Headers
* Gunicorn
* WhiteNoise

### Database

* SQLite for local development
* PostgreSQL for production

---

## 🏗️ Architecture

```text
                    ┌─────────────────┐
                    │     React       │
                    │    Frontend     │
                    │     Vercel      │
                    └────────┬────────┘
                             │
                             │ HTTP Requests
                             ▼
                    ┌─────────────────┐
                    │ Django REST API │
                    │     Railway     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │     Railway     │
                    └─────────────────┘
```

## 📁 Project Structure

```text
Corporate_Project_Management_System/
│
├── backend/
│   ├── accounts/              # Authentication and user management
│   ├── projects/              # Project management
│   ├── tasks/                 # Task management
│   │
│   ├── backend/               # Django project configuration
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   │
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
├── .gitignore
└── README.md
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
python -m venv .venv
```

Activate the virtual environment.

### Windows

```bash
.venv\Scripts\activate
```

### macOS/Linux

```bash
source .venv/bin/activate
```

Install the required dependencies:

```bash
python -m pip install -r requirements.txt
```

Run database migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

The backend will run locally at:

```text
http://127.0.0.1:8000
```

## 💻 Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file inside the `frontend` directory:

```text
VITE_API_URL=http://127.0.0.1:8000
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

## 🔗 Running the Full Application

To run the complete application locally:

1. Start the Django backend.
2. Start the React frontend.
3. Make sure the frontend `.env` file contains:

```text
VITE_API_URL=http://127.0.0.1:8000
```

4. Open the frontend URL provided by Vite in your browser.

## 🔐 Authentication

The application uses **JWT (JSON Web Token)** authentication.

After successful login, the backend provides:

* Access Token
* Refresh Token

Protected API requests include the access token in the request header:

```text
Authorization: Bearer <access_token>
```

When the access token expires, the frontend attempts to obtain a new token using the refresh token. If authentication fails, the user is logged out.

## 🔒 Authorization

The application implements role-based permissions.

Managers have permission to perform operations such as:

* Creating projects
* Updating projects
* Deleting projects

Other authenticated users have access according to their role and project membership.

The backend uses a custom permission class:

```text
IsManagerOrReadOnly
```

## 🌐 Environment Variables

### Backend

Example local configuration:

```text
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

For PostgreSQL in production:

```text
PGDATABASE=
PGUSER=
PGPASSWORD=
PGHOST=
PGPORT=
```

For the deployed frontend:

```text
FRONTEND_URL=https://corporate-project-management-system.vercel.app
```

### Frontend

For local development:

```text
VITE_API_URL=http://127.0.0.1:8000
```

For production:

```text
VITE_API_URL=https://corporateprojectmanagementsystem-production.up.railway.app
```

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

Handles:

* User registration
* User login
* JWT authentication
* Token refresh
* User profile management
* User roles

### Projects

Handles:

* Project creation
* Project retrieval
* Project updates
* Project deletion
* Project membership
* Role-based project permissions

### Tasks

Handles:

* Task creation
* Task organization
* Task management within projects

## 🚀 Deployment

### Frontend

The React frontend is deployed using Vercel.

**Live Application:**
[Corporate Project Management System Frontend](https://corporate-project-management-system.vercel.app)

### Backend

The Django REST API is deployed using Railway.

**Backend API:**
[Corporate Project Management System Backend API](https://corporateprojectmanagementsystem-production.up.railway.app)

### Database

The production application uses PostgreSQL hosted on Railway.

## 🔮 Future Improvements

Possible future enhancements include:

* Task assignment to specific team members
* Task priorities
* Deadlines and due dates
* Project progress tracking
* Dashboard analytics
* Notifications
* File attachments
* Search and filtering
* Email verification
* Password reset functionality
* Activity logs

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes.
4. Commit your changes:

```bash
git commit -m "Add your feature"
```

5. Push the branch:

```bash
git push origin feature/your-feature-name
```

6. Create a Pull Request.

## 📄 License

This project is currently intended for educational and development purposes.

## 👨‍💻 Author

**Rishi Agarwal**

GitHub: [SPARKDEVIL9724](https://github.com/SPARKDEVIL9724)

⭐ If you find this project useful, consider giving it a star!