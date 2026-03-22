import { NextRequest } from "next/server";
import { generateCode } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const { prompt, existingCode } = await request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt é obrigatório" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const stream = await generateCode(prompt, existingCode);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Generation error:", error);
    return new Response(JSON.stringify({ error: "Erro na geração de código" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
