# Task Dashboard

A Next.js-based task management dashboard with AI-powered task suggestions, user authentication, and real-time task updates using Socket.IO.

---

## Features

- **User Authentication**: Login and logout functionality with token-based authentication.
- **Task Management**: Create, view, and update tasks with status (Pending, In Progress, Completed).
- **AI-Powered Suggestions**: Get AI-generated task suggestions using Gemini or OpenAI.
- **Real-Time Updates**: Real-time task updates using Socket.IO.
- **Responsive Design**: A clean and responsive user interface.

---

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI Integration**: Gemini
- **Real-Time Communication**: Socket.IO
- **Authentication**: Token-based authentication
- **State Management**: React `useState` and `useEffect`

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- API key for Gemini or OpenAI (optional, for AI suggestions)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kshitijasharma/Zocket_submission.git
   cd my-next-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:
   ```env
   GEMINI_API_KEY=your-gemini-api-key
   # or
   OPENAI_API_KEY=your-openai-api-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## Project Structure

```
task-dashboard/
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js app router
│   │   ├── api/          # API routes
│   │   │   ├── auth/     # Authentication endpoints
│   │   │   ├── gemini/   # Gemini AI endpoint
│   │   │   ├── tasks/    # Task management endpoints
│   │   ├── dashboard/    # Dashboard page
│   │   ├── login/        # Login page
│   │   └── utils/        # Utility functions
│   ├── components/       # Reusable components
│   └── styles/           # Global styles
├── .env.local            # Environment variables
├── package.json          # Project dependencies
├── README.md             # Project documentation
└── tsconfig.json         # TypeScript configuration
```

---

## API Endpoints

### Authentication
- **POST `/api/auth/login`**: Authenticate a user.
  - Request Body:
    ```json
    {
      "username": "admin",
      "password": "password"
    }
    ```
  - Response:
    ```json
    {
      "token": "fake-token"
    }
    ```

- **GET `/api/auth/me`**: Verify user token.
  - Headers:
    ```json
    {
      "Authorization": "Bearer <token>"
    }
    ```
  - Response:
    ```json
    {
      "user": { "username": "admin" }
    }
    ```

### Task Management
- **GET `/api/tasks`**: Fetch all tasks.
  - Response:
    ```json
    [
      {
        "id": "1",
        "title": "Task 1",
        "description": "Description 1",
        "assignedTo": "User 1",
        "status": "Pending",
        "deadline": "2023-12-31"
      }
    ]
    ```

- **POST `/api/tasks`**: Create a new task.
  - Request Body:
    ```json
    {
      "title": "New Task",
      "description": "Task Description",
      "assignedTo": "User 1",
      "deadline": "2023-12-31"
    }
    ```

- **PUT `/api/tasks`**: Update task status.
  - Request Body:
    ```json
    {
      "id": "1",
      "status": "Completed"
    }
    ```

### AI Integration
- **POST `/api/gemini`**: Get AI suggestion.
  - Request Body:
    ```json
    {
      "prompt": "Plan a vacation"
    }
    ```
  - Response:
    ```json
    {
      "suggestion": "AI suggestion for: Plan a vacation"
    }
    ```

---

## Usage

### Login
1. Navigate to `http://localhost:3000/login`.
2. Enter your username and password.
3. Click "Login" to access the dashboard.

### Dashboard
1. **Create Task**:
   - Fill in the task details (title, description, assigned to, deadline).
   - Click "Add Task" to create a new task.

2. **Get AI Suggestion**:
   - Enter a task description in the input field.
   - Click "Get AI Suggestion" to fetch an AI-generated suggestion.

3. **Update Task Status**:
   - Click the "Complete" button next to a task to mark it as completed.

4. **Logout**:
   - Click the "Logout" button in the header to log out.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
