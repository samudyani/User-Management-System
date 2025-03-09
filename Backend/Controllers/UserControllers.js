const User = require("../Model/UserModel");
const express = require("express");
const router = express.Router();

// DISPLAY ALL USERS
const getAllUsers = async (req, res, next) => {
    try {
        let users;
        let name = req.query.name; // Ensure this is correctly extracting the query parameter
        console.log(req.query.name);
        if (name && name.trim() !== "") {
            users = await User.find({ name: { $regex: name, $options: "i" } }).lean();
        } else {
            users = await User.find().lean();
        }

        if (!users.length) {
            return res.status(404).json({ message: "No users found" });
        }

        return res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching users" });
    }
};

// INSERT NEW USER
const addUser = async (req, res, next) => {
    const { name, age, email, phone, guardianName, guardianPhone, address, stream, gender, role } = req.body;
    const generateStudentID = () => {
        const year = new Date().getFullYear();
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return `EG/${year}/${randomNum}`;
    };

    let user;
    try {
        user = new User({
            name,
            studentID: generateStudentID(),
            age,
            email,
            phone,
            guardianName,
            guardianPhone,
            address,
            stream,
            gender,
            role
        });

        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error saving user data" });
    }

    return res.status(201).json({ message: "User added successfully", user });
};

// GET USER BY ID
const getById = async (req, res, next) => {
    const id = req.params.id;
    let user;

    try {
        user = await User.findById(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error fetching user" });
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
};

// UPDATE USER DETAILS
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, studentID, age, email, phone, guardianName, guardianPhone, address, stream, gender, role } = req.body;

    let user;
    try {
        user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

       

        // Update user fields
        user.name = name;
        user.age = age;
        user.email = email;
        user.phone = phone;
        user.guardianName = guardianName;
        user.guardianPhone = guardianPhone;
        user.address = address;
        user.stream = stream;
        user.gender = gender;
        user.role = role;

        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating user" });
    }

    return res.status(200).json({ message: "User updated successfully", user });
};

// DELETE USER
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;

    try {
        user = await User.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error deleting user" });
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
};

// Export the functions
exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;  