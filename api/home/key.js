const myKey = process.env.apiKey;

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
        
            res.status(200).json({ myKey });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}