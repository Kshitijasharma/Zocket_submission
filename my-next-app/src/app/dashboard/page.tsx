"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import axios from "axios";

const socket = io("/api/socket");

const Header = ({ onLogout }: { onLogout: () => void }) => (
  <header className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">Task Dashboard</h1>
    <button
      onClick={onLogout}
      className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  </header>
);

type Task = {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: "Pending" | "In Progress" | "Completed";
  deadline: string;
};

const Dashboard = () => {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
  });
  const [isCreatingTask, setIsCreatingTask] = useState(false); // Loading state for task creation
  const [isFetchingSuggestion, setIsFetchingSuggestion] = useState(false); // Loading state for AI suggestion
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error verifying user:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/tasks");
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    verifyUser();
    fetchTasks();

    socket.on("taskUpdate", (updatedTasks) => {
      setTasks(updatedTasks);
    });

    return () => {
      socket.off("taskUpdate");
    };
  }, [router]);

  const getAISuggestion = async () => {
    if (!input.trim()) {
      alert("Please enter a task description.");
      return;
    }

    setIsFetchingSuggestion(true);
    setSuggestion("");

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) throw new Error("Failed to fetch AI suggestion.");

      const data = await res.json();
      setSuggestion(data.suggestion || "No response from AI.");
    } catch (error) {
      console.error("Error fetching AI suggestion:", error);
      setSuggestion("Error fetching AI response.");
    } finally {
      setIsFetchingSuggestion(false);
    }
  };

  const createTask = async () => {
    if (!newTask.title || !newTask.description || !newTask.assignedTo || !newTask.deadline) {
      alert("All fields are required.");
      return;
    }

    setIsCreatingTask(true);

    try {
      await axios.post("/api/tasks", newTask);
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
      setNewTask({ title: "", description: "", assignedTo: "", deadline: "" });
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsCreatingTask(false);
    }
  };

  const updateTaskStatus = async (id: string, status: Task["status"]) => {
    try {
      await axios.put("/api/tasks", { id, status });
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) return <p className="text-center mt-10 text-gray-700">Loading...</p>;

  return (
    <div className="flex flex-col h-screen">
      <Header onLogout={handleLogout} />
      <main className="flex-1 bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <p className="text-center text-black mb-4">Welcome, {user?.username}!</p>

          {/* AI Task Suggestion Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter a task description..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border p-2 rounded text-black"
            />
            <button
              onClick={getAISuggestion}
              disabled={isFetchingSuggestion}
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
            >
              {isFetchingSuggestion ? "Fetching Suggestion..." : "Get AI Suggestion"}
            </button>
          </div>

          {/* AI Suggestion Display */}
          {suggestion && (
            <div className="mt-4 border p-3 rounded bg-gray-100 text-black">
              <strong>AI Suggestion:</strong> {suggestion}
            </div>
          )}

          {/* Task Creation Form */}
          <div className="mt-6">
            <h2 className="font-bold text-lg mb-2 text-black">Create Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full border p-2 rounded mb-2 text-black"
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full border p-2 rounded mb-2 text-black"
            />
            <input
              type="text"
              placeholder="Assign To"
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              className="w-full border p-2 rounded mb-2 text-black"
            />
            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              className="w-full border p-2 rounded mb-2 text-black"
            />
            <button
              onClick={createTask}
              disabled={isCreatingTask}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:bg-green-300"
            >
              {isCreatingTask ? "Creating Task..." : "Add Task"}
            </button>
          </div>

          {/* Task List */}
          <h2 className="font-bold text-lg mt-6 text-black">Task List</h2>
          <table className="w-full mt-4 border">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-black">Title</th>
                <th className="p-2 text-black">Assigned To</th>
                <th className="p-2 text-black">Status</th>
                <th className="p-2 text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b">
                  <td className="p-2 text-black">{task.title}</td>
                  <td className="p-2 text-black">{task.assignedTo}</td>
                  <td className="p-2 text-black">{task.status}</td>
                  <td className="p-2">
                    <button
                      onClick={() => updateTaskStatus(task.id, "Completed")}
                      className="bg-green-500 text-white p-1 rounded"
                    >
                      Complete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <footer className="w-full bg-gray-800 text-white p-4 text-center">
        Created by KS
      </footer>
    </div>
  );
};

export default Dashboard;