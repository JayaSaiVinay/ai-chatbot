import React, { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { jwtDecode } from "jwt-decode";
import AdminUpload from "./AdminUpload";
import axios from "axios";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token).user : null;

  const authConfig = {
    headers: {
      "x-auth-token": token,
    },
  };

  useEffect(() => {
    if (user?.role === "admin" || !token) {
      return;
    }

    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5001/api/chat/history`,
          authConfig
        );
        if (response.data && response.data.messages.length > 0) {
          setMessages(response.data.messages);
        } else {
          setMessages([
            { sender: "bot", text: "Hello! How can I assist you today?" },
          ]);
        }
      } catch (error) {
        setMessages([
          { sender: "bot", text: "Hello! How can I assist you today?" },
        ]);
        console.log("No previous history found for this user.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [token, user?.role]);

  const handleSendMessage = async (message) => {
    const userMessage = { sender: "user", text: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/chat",
        { message: message },
        authConfig
      );
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
      {user && user.role === "admin" ? (
        <AdminUpload />
      ) : (
        <>
          <MessageList messages={messages} isLoading={isLoading} />
          <MessageInput onSendMessage={handleSendMessage} />
        </>
      )}
    </div>
  );
};

export default ChatWindow;
