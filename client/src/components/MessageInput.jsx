import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      onSendMessage(text);
      setText("");
    }
  };
  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">
        <FaPaperPlane
          style={{
            color: "white",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1rem",
          }}
        />
      </button>
    </form>
  );
};

export default MessageInput;
