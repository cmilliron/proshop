import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
// import jwt from "jsonwebtoken";

function throwError(code, message) {
  res.status(code);
  throw new Error(message);
}

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  console.log("** in register user **");
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    console.log(user);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   GET /api/users/logout
// @access  Private
export const logoutUser = (req, res) => {
  console.log("** In logoutUser **");
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "user logged out" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  console.log("** in updateUserProfile  1 **");
  const user = await User.findById(req.user._id);
  console.log(user);
  console.log(req.body.name, req.body.email, req.body.password);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete User
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: userId });
    res.json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update User
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select("-password");

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
