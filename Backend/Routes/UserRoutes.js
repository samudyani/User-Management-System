const express = require("express");
const router = express.Router();

// Import User Controller 
const UserController = require("../Controllers/UserControllers"); 

// Define Routes
router.get("/", UserController.getAllUsers);
router.post("/", UserController.addUser); 
router.get("/:id", UserController.getById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;