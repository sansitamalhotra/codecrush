import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const OPENAI_API_KEY = 'your-openai-key-here' // Replace with your actual key

app.post('/api/hint', async (req, res) => {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',  // or 'gpt-4' if you prefer
                messages: req.body.messages,
                max_tokens: req.body.max_tokens || 500,
                temperature: 0.7
            })
        })

        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.listen(3001, () => {
    console.log('🚀 OpenAI Proxy server running on http://localhost:3001')
})