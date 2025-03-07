const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    studentID: {
        type: String,
        required: true,
        unique: true
    },

    age: {
        type: Number,
        required: true,
        min: 16, // Minimum age for class 12 and 13
        max: 50
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },

    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Phone number must be 10 digits"]
    },

    guardianName: {
        type: String,
        required: function() { return this.age < 18; } 
    },

    guardianPhone: {
        type: String,
        required: function() { return this.age < 18; },
        match: [/^\d{10}$/, "Phone number must be 10 digits"]
    },

    address: {
        type: String,
        required: true
    },


    stream: {
        type: String,
        enum: ["Science", "Commerce", "Technology"],
        required: true
    },


    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },

    role: {
        type: String,
        enum: ["Student", "Teacher", "Admin"],
        default: "Student"
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

module.exports = mongoose.model("users", userSchema);
