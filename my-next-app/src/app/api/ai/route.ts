import { NextResponse } from "next/server";

// Simulate AI integration (replace with actual AI logic)
const generateAISuggestion = async (userInput: string): Promise<string> => {
  // Simulate a delay to mimic an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate AI response
  return `AI suggestion for: ${userInput}`;
};

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { userInput } = await request.json();

    // Validate the input
    if (!userInput || typeof userInput !== "string") {
      return NextResponse.json(
        { error: "Invalid input. Please provide a valid userInput." },
        { status: 400 }
      );
    }

    // Generate AI suggestion
    const suggestion = await generateAISuggestion(userInput);

    // Return the suggestion
    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error("Error in AI API route:", error);

    // Return an error response
    return NextResponse.json(
      { error: "Failed to generate AI suggestion." },
      { status: 500 }
    );
  }
}