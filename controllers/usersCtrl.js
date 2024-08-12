import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verfiyToken.js";

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
      token: generateToken(userFound?._id),
    });
  }
  throw new Error("Invalid login credentials");
});

//@desc  Get user profile
//@route GET /api/v1/users/profile
//@access Private
export const getUserProfileCtrl = asyncHandler(async (req, res) => {
  const token = getTokenFromHeader(req);
  //verifyToken
  const verified = verifyToken(token);
  res.json({
    message: "Welcome to Profile page",
  });
});

//@desc  Update user shipping Address
//@route PUT /api/v1/users/update/shipping
//@access Private

export const updateShippingAddressCtrl = asyncHandler(async (req, res) => {
  const { firstName, lastName, address, city, postalCode, province, phone } =
    req.body;
  const userUpdated = await User.findByIdAndUpdate(
    req.userAuthId,
    {
      shippingAddress: {
        firstName,
        lastName,
        address,
        city,
        postalCode,
        province,
        phone,
      },
      hasShippingAddress: true,
    },
    {
      new: true,
    }
  );
  //send the response
  res.json({
    status: "success",
    message: "User shipping address updated successfully",
    userUpdated,
  });
});
