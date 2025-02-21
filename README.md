# Zocket_submission
# Zocket-Task-Frontend-Code


# *Zocket.ai - Task Management App*

Zocket.ai is a modern, real-time task management platform designed to help teams and individuals organize their work efficiently. With features like real-time updates, AI-powered task suggestions, and a user-friendly interface, Zocket.ai ensures seamless collaboration and productivity.

---

## *Features*

- *Real-Time Task Updates*: Stay synced with your team using Socket.IO for instant updates.
- *AI-Powered Suggestions*: Get smart task suggestions powered by Gemini AI.
- *User Authentication*: Secure login and token-based authentication.
- *Task Management*: Create, update, and complete tasks with ease.
- *Modern UI*: Clean, responsive design with hover effects and animations.
- *Responsive Design*: Works seamlessly on mobile, tablet, and desktop.

---

## *Technologies Used*

- *Frontend*: Next.js, Tailwind CSS
- *Backend*: Node.js, Express.js
- *Real-Time Communication*: Socket.IO
- *AI Integration*: Gemini API
- *Database*: (Mention your database, e.g., MongoDB, PostgreSQL)
- *Authentication*: JWT (JSON Web Tokens)

---

## *Setup Instructions*

### *Prerequisites*
- Node.js (v16 or higher)
- npm or yarn
- Gemini API key (for AI suggestions)
- Socket.IO server (for real-time updates)

### *Steps to Run the Project*

1. *Clone the Repository*:
   bash
   git clone https://github.com/your-username/zocket-ai.git
   cd zocket-ai
   

2. *Install Dependencies*:
   bash
   npm install
   # or
   yarn install
   

3. *Set Up Environment Variables*:
   Create a .env file in the root directory and add the following:
   env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_SOCKET_SERVER_URL=your_socket_server_url
   JWT_SECRET=your_jwt_secret
   

4. *Run the Development Server*:
   bash
   npm run dev
   # or
   yarn dev
   

5. *Open the App*:
   Visit http://localhost:3000 in your browser.

---

## *Usage*

1. *Log In*:
   - Use your credentials to log in. If you don’t have an account, sign up.

2. *Create a Task*:
   - Fill out the task form with a title, description, assignee, and deadline.

3. *Get AI Suggestions*:
   - Type a task description in the input field and click "Get AI Suggestion."

4. *Update Task Status*:
   - Mark tasks as "Pending," "In Progress," or "Completed."

5. *Real-Time Collaboration*:
   - All changes are synced in real-time across devices.

---

## *Folder Structure*


zocket-ai/
├── public/              # Static assets (images, icons)
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Next.js pages
│   ├── styles/          # Custom styles (if any)
│   ├── utils/           # Utility functions
│   └── api/             # API routes
├── .env                 # Environment variables
├── package.json         # Project dependencies
└── README.md            # Project documentation


---

## *Contributing*

We welcome contributions! If you’d like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeatureName).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/YourFeatureName).
5. Open a pull request.

## *License*

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


## *Acknowledgments*

- *Socket.IO* for real-time communication.
- *Gemini API* for AI-powered task suggestions.
- *Tailwind CSS* for modern and responsive design.
