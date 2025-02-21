// import { NextRequest, NextResponse } from "next/server";

// let tasks:any = [];

// export async function GET() {
//   return NextResponse.json(tasks);
// }

// export async function POST(req: NextRequest) {
//   const { title, assignedTo } = await req.json();
//   const newTask = { id: Date.now(), title, assignedTo, status: "pending" };
//   tasks.push(newTask);

//   return NextResponse.json(newTask);
// }

// import { NextRequest, NextResponse } from "next/server";
// import { suggestTask } from "../../utils/ai"// "@/utils/ai";

// let tasks:any = [];

// export async function GET() {
//   return NextResponse.json(tasks);
// }

// export async function POST(req: NextRequest) {
//   const { title, assignedTo } = await req.json();
//   const suggestedTask = await suggestTask(title);
//   const newTask = { id: Date.now(), title: suggestedTask, assignedTo, status: "pending" };

//   tasks.push(newTask);
//   return NextResponse.json(newTask);
// }

// import { NextApiRequest, NextApiResponse } from "next";
// import { Server } from "socket.io";
// //import { getTaskSuggestions } from "../../utils/ai"
// import { suggestTask } from "../../utils/ai"// "@/utils/ai";

// let tasks = [
//   { id: "1", title: "Build API", description: "Develop backend services", assignedTo: "Alice", status: "Pending", deadline: "2025-02-25" },
// ];

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     return res.status(200).json(tasks);
//   }

//   if (req.method === "POST") {
//     const { title, description, assignedTo, deadline } = req.body;
//     const newTask = { id: Date.now().toString(), title, description, assignedTo, status: "Pending", deadline };
//     tasks.push(newTask);

//     (global as any).io?.emit("taskUpdate", tasks);
//     return res.status(201).json(newTask);
//   }

//   if (req.method === "PUT") {
//     const { id, status } = req.body;
//     tasks = tasks.map(task => (task.id === id ? { ...task, status } : task));

//     (global as any).io?.emit("taskUpdate", tasks);
//     return res.status(200).json({ message: "Task updated" });
//   }

//   if (req.method === "POST" && req.query.suggestions) {
//     const { input } = req.body;
//     const suggestions = await suggestTask(input);
//     return res.status(200).json(suggestions);
//   }

//   res.status(405).json({ message: "Method not allowed" });
// }


import { NextRequest, NextResponse } from "next/server";
import { Server } from "socket.io";
import { suggestTask } from "../../utils/ai"; // Ensure correct import
 


// In-memory task storage (Replace with DB in production)
let tasks: any[] = [
  { id: "1", title: "Build API", description: "Develop backend services", assignedTo: "Alice", status: "Pending", deadline: "2025-02-25" },
];

// Handle GET requests (Fetch tasks)
export async function GET() {
  return NextResponse.json(tasks, { status: 200 });
}

// Handle POST requests (Create a task)
export async function POST(req: NextRequest) {
  try {
    const { title, description, assignedTo, deadline } = await req.json();

    if (!title || !description || !assignedTo || !deadline) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newTask = { id: Date.now().toString(), title, description, assignedTo, status: "Pending", deadline };
    tasks.push(newTask);

    // Emit real-time updates using Socket.IO
    (global as any).io?.emit("taskUpdate", tasks);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Handle PUT requests (Update task status)
export async function PUT(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Missing task ID or status" }, { status: 400 });
    }

    tasks = tasks.map(task => (task.id === id ? { ...task, status } : task));

    // Emit real-time updates
    (global as any).io?.emit("taskUpdate", tasks);

    return NextResponse.json({ message: "Task updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Handle AI Task Suggestions (POST /api/tasks?suggestions=true)
export async function POST_SUGGESTIONS(req: NextRequest) {
  try {
    const { input } = await req.json();
    if (!input) return NextResponse.json({ error: "Input is required" }, { status: 400 });

    const suggestions = await suggestTask(input);
    return NextResponse.json(suggestions, { status: 200 });
  } catch (error) {
    console.error("Error getting AI suggestions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Catch-all method for unsupported HTTP methods
export async function OPTIONS() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}