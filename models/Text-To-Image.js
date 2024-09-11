const OpenAI = require("openai");
const openai = new OpenAI();

async function main() {
const response = await openai.images.generate({
  model: "dall-e-3",
  prompt: "Generate for me a programmable high-definition multidimensional programmable illustrating a map of the universe on a digital PUZZLE (grid display) Space & Time mappping process l image doit etre en 16:9 au format .webp",
  n: 1,
  size: "1792x1024",
});

image_url = response.data[0].url;
console.log(image_url);
}
main();
