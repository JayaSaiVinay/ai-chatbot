import React from "react";
import { useState } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import axios from "axios";
const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", content: "Hello! How can I help you today?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSendMessage = async (message) => {
    const userMessage = { sender: "user", text: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    // API Call

    try {
      const response = await axios.post("http://localhost:5001/api/chat", {
        userId: "session_123",
        message: message,
      });
      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching bot reply:", error);
      const errorMessage = {
        sender: "bot",
        text: "Sorry, I am having trouble connecting. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>AI Support Agent</h2>
      </div>
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
