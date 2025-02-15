import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const myAssistant = await openai.beta.assistants.create({
    instructions:
      "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
    name: "assistant",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4o",
  });

  console.log(myAssistant);
}

main();