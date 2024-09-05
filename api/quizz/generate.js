const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.google);

const inputValue = `
The following are the questions and options for the quiz. Each question has four options, with the correct answer indicated by the index (0-based).

`;

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { str } = req.body;
            if (!str) {
                return res.status(400).json({ error: 'No prompt provided' });
            }

            const fullString = inputValue + str;

            const result = await run(fullString);
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
