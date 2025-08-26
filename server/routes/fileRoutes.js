const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParser = require("pdf-parse");
const CompanyData = require("../models/CompanyData");
const authMiddleware = require("../middleware/auth");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/upload",
  [authMiddleware, upload.single("file")],
  async (req, res) => {
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    try {
      const data = await pdfParser(req.file.buffer);
      await CompanyData.deleteMany({});
      const newCompanyData = new CompanyData({
        filename: req.file.originalname,
        content: data.text,
      });
      await newCompanyData.save();
      res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
      console.error("Error processing file:", error);
      res.status(500).send("Error processing file.");
    }
  }
);

module.exports = router;
