import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

//@desc  Register user
//@route Post /api/v1/users/register
//@access Private/Admin
export const registerUserCtrl = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  //check for existed user
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exist");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create the user
  const user = await User.create({ fullName, email, password: hashedPassword });
  res.status(201).json({
    status: "success",
    message: "User Registered Successfully",
    data: user,
  });
});

//@desc  Login user
//@route Post /api/v1/users/login
//@access Public
export const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //find user by email from userDatabase
  const userFound = await User.findOne({ email });
  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    return res.json({
      message: "Successfully LoggedIn",
      data: userFound,
    });
  }
  throw new Error("Invalid login credentials");
});
