const OpenAI = require("openai");

// Configure OpenAI API key (recommended: use environment variables)
const openai = new OpenAI

async function queryGPTAssistant(
  prompt,
  assistantId = "asst_LcbFgdghFHSr9MI7rkPggKVV", // Replace with your assistant ID
  model = "gpt-4-1106-preview"
) {
  """
  Queries a specified GPT assistant with a given prompt.

  Args:
      prompt: The text prompt to send to the assistant.
      assistantId: The ID of the GPT assistant to use. Defaults to your provided ID.
      model: The GPT model to use with the thread.  Defaults to gpt-4-1106-preview.

  Returns:
      The assistant's response as a string, or null if an error occurs.
  """
  try {
    const thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create({
      threadId: thread.id,
      role: "user",
      content: prompt,
    });

    const run = await openai.beta.threads.runs.create({
      threadId: thread.id,
      assistantId: assistantId,
    });

    let runStatus = run.status;
    while (
      runStatus !== "completed" &&
      runStatus !== "failed" &&
      runStatus !== "cancelled" &&
      runStatus !== "expired"
    ) {
      const retrievedRun = await openai.beta.threads.runs.retrieve({
        threadId: thread.id,
        runId: run.id,
      });
      runStatus = retrievedRun.status;

        // Optional: Add a delay to avoid hitting API rate limits
       // await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second

    }


    if (runStatus === "completed") {
      const messages = await openai.beta.threads.messages.list({
        threadId: thread.id,
      });
      const assistantMessage = messages.data.find(
        (m) => m.role === "assistant"
      );

      if (assistantMessage) {
        return assistantMessage.content[0].text.value;
      } else {
        return null; // No assistant message found
      }
    } else {
      console.error(`Run failed with status: ${runStatus}`);
      return null;
    }
  } catch (error) {
    console.error(`OpenAI API error: ${error}`);
    return null;
  }
}


// Example usage (requires Node.js environment):
async function runExample() {
    const userPrompt = "What are the key considerations for designing a robust smart contract?";
    const assistantResponse = await queryGPTAssistant(userPrompt);

    if (assistantResponse) {
        console.log("Assistant's response:");
        console.log(assistantResponse);
    }
}


runExample();
