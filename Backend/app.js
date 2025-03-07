const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./Routes/UserRoutes"); // Import routes

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS (for frontend communication)
app.use(cors());

// Load Routes
app.use("/users", userRoutes);

// Connect to MongoDB
mongoose.connect("mongodb+srv://samu20000529:DquhdNC39ZYwDAVb@ume1.bz5zu.mongodb.net/?retryWrites=true&w=majority&appName=UME1")

    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((err) => {
        console.log("MongoDB Connection Error:", err);
    });
