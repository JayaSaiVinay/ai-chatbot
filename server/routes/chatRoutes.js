const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");
const Groq = require("groq-sdk");
const auth = require("../middleware/auth");
const CompanyData = require("../models/CompanyData");
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
router.use(auth);
router.post("/", async (req, res) => {
  const userId = req.user.id;
  const { message } = req.body;
  if (!userId || !message) {
    return res.status(400).json({ error: "userId and message are required." });
  }

  try {
    let conversation = await Conversation.findOne({ userId });
    if (!conversation) {
      conversation = new Conversation({ userId, messages: [] });
    }
    conversation.messages.push({ sender: "user", text: message });

    const companyInfo = await CompanyData.findOne({});
    const contextText = companyInfo ? companyInfo.content : "";
    console.log(contextText);
    const systemPrompt = `You are a helpful customer support agent.
    Your answers must be based ONLY on the information provided below.
    If the user's question cannot be answered using this information, you must say "I'm sorry, I don't have that information."

    --- COMPANY INFORMATION ---
    ${contextText}
    --- END OF INFORMATION ---`;

    const promptMessages = conversation.messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    promptMessages.unshift({
      role: "system",
      content: systemPrompt,
    });

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: promptMessages,
    });
    const botReplyText = completion.choices[0].message.content;
    conversation.messages.push({ sender: "bot", text: botReplyText });
    await conversation.save();
    res.json({ reply: botReplyText });
  } catch (error) {
    console.error("Error during chat processing:", error);
    res.status(500).json({ error: "Something went wrong on the server." });
  }
});

router.get("/history", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      userId: req.user.id,
    });
    if (conversation) {
      res.json(conversation);
    } else {
      res
        .status(404)
        .json({ message: "No conversation history found for this user." });
    }
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Server error while fetching history." });
  }
});

module.exports = router;
