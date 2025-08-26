import React, { useState } from "react";
import axios from "axios";

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      setIsError(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5001/api/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );
      setMessage(response.data.message);
      setIsError(false);
    } catch (error) {
      let displayMessage = "An unknown upload error occurred.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        displayMessage = error.response.data.message;
      }
      setMessage(displayMessage);
      setIsError(true);
    }
  };

  return (
    <div className="admin-upload">
      <h3>Admin: Upload Company Data</h3>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p className={isError ? "error" : "success"}>{message}</p>}
    </div>
  );
};

export default AdminUpload;
