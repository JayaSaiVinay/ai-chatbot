require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const chatRoutes = require("./routes/chatRoutes");
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("AI Chat Server is running!");
});
app.use("/api/chat", chatRoutes);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
