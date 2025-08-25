import React from "react";
import ReactMarkdown from 'react-markdown';
const MessageList = ({ messages, isLoading }) => {
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
    </div>
  );
};

export default MessageList;
