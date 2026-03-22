import Groq from "groq-sdk";
import { SYSTEM_PROMPT_GENERATE, buildGeneratePrompt, buildIteratePrompt } from "./prompts";

function getClient() {
  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
}

export async function generateCode(
  transcript: string,
  existingCode?: string
): Promise<ReadableStream> {
  const groq = getClient();
  const isIteration = !!existingCode;

  const userMessage = isIteration
    ? buildIteratePrompt(transcript, existingCode!)
    : buildGeneratePrompt(transcript);

  const systemMessage = isIteration
    ? "Você modifica componentes React existentes conforme instruções em português. Retorne SOMENTE o código completo modificado, sem markdown ou explicações."
    : SYSTEM_PROMPT_GENERATE;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    stream: true,
    temperature: 0.3,
    max_tokens: 4096,
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
  });

  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
      }
      controller.close();
    },
  });
}
