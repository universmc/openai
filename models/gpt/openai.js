const fs = require("fs");
const OpenAI = require("openai");
const openai = new OpenAI();
async function main() {
openai.chat.completions.create({
    //
    // Required parameters
    //
    messages: [
        // Set an optional system message. This sets the behavior of the
        // assistant and can be used to provide specific instructions for
        // how it should behave throughout the conversation.
    
        {
            role: "system",
            content: "Génère le code HTML d'une page d'index.html"
        },
    ],
            model: "gpt-4o",
            temperature: 0.8,
            max_tokens: 2048,
            top_p: 1,
            stop: null,
            stream: false
    }).then((chatCompletion) => {
            const mdContent = chatCompletion.choices[0]?.message?.content;
            const outputFilePath = "openAi_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
            fs.writeFileSync(outputFilePath, mdContent);
            console.log("Documentation générée et enregistrée dans " + outputFilePath);
        })};
main();