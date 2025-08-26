
-----

# AI Customer Support Chat Platform

A full-stack, AI-powered chat application designed to provide contextual customer support. This platform allows users to interact with an intelligent assistant whose knowledge base can be customized by an administrator uploading company-specific documents. The application features a secure, token-based authentication system and a clean, responsive user interface. 

-----
Main Chat Interface
<img width="822" height="908" alt="1" src="https://github.com/user-attachments/assets/ef19540b-fe34-441f-81e8-03d327fce4b0" />

Admin Interface
<img width="822" height="908" alt="2" src="https://github.com/user-attachments/assets/750c0f2d-2c87-4b87-a5ae-16124e016757" />

Admin Interface
<img width="822" height="908" alt="3" src="https://github.com/user-attachments/assets/0a0a7bcf-7a0c-4c57-b8f9-f9629db8e6bf" />

Working video
https://github.com/user-attachments/assets/fe5adf10-0e09-40c2-b6df-bf70d6c53d7d

Key Features

  * **Real-time Chat Interface**: A clean and intuitive UI for seamless conversation with the AI agent.
  * **Contextual AI Responses**: The AI's responses are based on document's data uploaded by an administrator, ensuring accurate and relevant information.
  * **User Authentication**: Secure user registration and login system using JSON Web Tokens (JWT).
  * **Role-Based Access Control**: A dedicated admin view for uploading knowledge base documents (PDFs).
  * **Persistent Conversation History**: Chat history is saved and loaded for each user, providing a continuous experience.
  * **Download Chat**: Users can download their conversation history as a `.txt` file.
  * **UI Polish**: Includes features like a typing indicator, auto-scrolling, and a responsive design.

-----

## 🛠️ Tech Stack

  * **Frontend**:
      * React (with Vite)
      * Axios
      * `react-markdown`, `react-icons`, `jwt-decode`
  * **Backend**:
      * Node.js
      * Express
      * Mongoose
  * **Database**:
      * MongoDB
  * **AI & Authentication**:
      * Groq API 
      * `jsonwebtoken` (JWT) & `bcryptjs`
  * **File Handling**:
      * `multer` & `pdf-parse`

-----

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### **Prerequisites**

  * Node.js (v18 or later recommended)
  * npm
  * MongoDB (A local instance or a free cloud instance from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### **Installation & Setup**

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/YourUsername/ai-chatbot.git
    cd ai-chatbot
    ```

2.  **Setup the Backend:**

      * Navigate to the server directory:
        ```bash
        cd server
        ```
      * Install the dependencies:
        ```bash
        npm install
        ```
      * Create a `.env` file in the `server` directory and add the following environment variables:
        ```env
        # .env for server
        PORT=5001
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_super_secret_jwt_key
        GROQ_API_KEY=your_groq_api_key
        ```

3.  **Setup the Frontend:**

      * Navigate to the client directory from the root folder:
        ```bash
        cd ../client
        ```
      * Install the dependencies:
        ```bash
        npm install
        ```
      * The frontend requires no `.env` file for this project.

### **Running the Application**

You will need to run the backend and frontend servers in two separate terminals.

1.  **Run the Backend Server:**

      * From the `server` directory:
        ```bash
        node index.js
        ```
      * The server should be running on `http://localhost:5001`.

2.  **Run the Frontend Application:**

      * From the `client` directory:
        ```bash
        npm run dev
        ```
      * The application will open in your browser, usually at `http://localhost:5173`.

-----

## 📂 Project Structure

The project is organized in a monorepo structure with two main folders:

```
ai-chatbot/
├── client/         # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── App.jsx
│       └── main.jsx
├── server/         # Node.js Backend
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── index.js
└── README.md
```
