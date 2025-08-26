import React from "react";
import ReactMarkdown from "react-markdown";
import { useRef, useEffect } from "react";
const MessageList = ({ messages, isLoading }) => {
  const messageEndRef = useRef(null);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender}`}>
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>
      ))}
      {isLoading && (
        <div className="message bot typing-indicator">
          <p>Agent is typing...</p>
        </div>
      )}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;
