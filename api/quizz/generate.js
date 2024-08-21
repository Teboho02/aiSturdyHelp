const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.google);


const inputValue = `
. You should return the answer in the format:

history: {
    'apartheid': [
        {
            question: "In which year did the apartheid policy officially begin in South Africa?",
            options: ["1948", "1956", "1961", "1976"],
            correctAnswer: 0
        },
        {
            question: "Who was the first black president of South Africa?",
            options: ["Nelson Mandela", "Thabo Mbeki", "Jacob Zuma", "Cyril Ramaphosa"],
            correctAnswer: 0
        }
    ],
    'boer wars': [
        {
            question: "What were the Boer Wars primarily fought over?",
            options: ["Territory", "Gold and Diamonds", "Religion", "Language"],
            correctAnswer: 1
        },
        {
            question: "Which two groups fought in the Boer Wars?",
            options: ["British and French", "Dutch and Zulu", "British and Boer", "Zulu and Xhosa"],
            correctAnswer: 2
        }
    ]
}
`;



const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { str } = req.body;
            if (!str) {
                return res.status(400).json({ error: 'No prompt provided' });
            }

            const fullString = str + inputValue;

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
