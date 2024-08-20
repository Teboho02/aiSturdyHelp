const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.google);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Extract the prompt from the request body
            const { str } = req.body;
            if (!str) {
                return res.status(400).json({ error: 'No prompt provided' });
            }

            // Generate content using the provided prompt
            const result = await run(str);
            res.status(200).json({ response: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

async function run(prompt) {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text(); // Await here for async operation
    return text;
}
