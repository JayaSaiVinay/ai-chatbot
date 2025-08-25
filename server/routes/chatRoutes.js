const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const Groq = require('groq-sdk');

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

router.post('/', async (req, res) => {
  const { userId, message } = req.body; 
  if (!userId || !message) {
    return res.status(400).json({ error: 'userId and message are required.' });
  }

  try {
    let conversation = await Conversation.findOne({ userId });
    if (!conversation) {
      conversation = new Conversation({ userId, messages: [] });
    }
    conversation.messages.push({ sender: 'user', text: message });

    const promptMessages = conversation.messages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
    }))

    promptMessages.unshift({
        role: 'system',
        content: 'You are a friendly and helpful customer support agent. Keep your answers concise and to the point. Use simple bullet points for lists if needed.',
    })

    const completion = await groq.chat.completions.create({
        model: "llama3-8b-8192",
        messages: promptMessages,
    })
    const botReplyText = completion.choices[0].message.content;
    conversation.messages.push({ sender: 'bot', text: botReplyText });
    await conversation.save();
    res.json({ reply: botReplyText });

  } catch (error) {
    console.error('Error during chat processing:', error);
    res.status(500).json({ error: 'Something went wrong on the server.' });
  }
});

module.exports = router;