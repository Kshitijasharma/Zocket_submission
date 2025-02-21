export async function POST(req: Request) {
    try {
      const { prompt } = await req.json();
  
      if (!prompt) {
        return new Response(JSON.stringify({ message: "Prompt is required" }), { status: 400 });
      }
  
      debugger;
      const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to fetch AI suggestion");
      }
  
      // Handle cases where no text is returned
      const suggestion = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received";
  
      return new Response(JSON.stringify({ suggestion }), { status: 200 });
    } catch (error) {
      console.error("Gemini API Error:", error);
      return new Response(JSON.stringify({ message: "Something went wrong", error: "error.message" }), { status: 500 });
    }
  }
  
  