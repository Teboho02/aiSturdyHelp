const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.google);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function handler(req, res) {
    try {
        const a = await run();
        res.status(200).json({ a });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function run() {
    const prompt = "Write a story about an AI and magic";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text(); // Await here for async operation
    return text;
}
