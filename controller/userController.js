import express from "express";
import { UserModel } from "../models/user.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });

const Register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        errors: [{ msg: "User already exists" }],
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({ name, email, password: hashPassword });
    const result = await newUser.save();
    // const userResponse= result.toObject();
    // delete userResponse.password;
    const { password: _, ...userResponse } = result._doc;
    return res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (err) {
    return res.status(500).json({
      errors: [{ msg: "Internal server error" }],
    });
  }
};

const Login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        errors: [{ msg: "User not registered" }],
      });
    }

    const isPasswordOk = await bcrypt.compare(password, userExist.password);
    if (!isPasswordOk) {
      return res.status(400).json({
        msg: "passsword is wrong",
      });
    }
    const token = jwt.sign({ _id: userExist._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const { password: _, ...userResponse } = userExist._doc;
    return res.status(201).json({
      message: "User logged in successfully",
      user: userResponse,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      errors: [{ msg: "Internal server error" }],
    });
  }
};

const Auth = (req, res) => {
  return res.status(201).json({ success: true, user: { ...req.user._doc } });
};

export { Register, Login, Auth };
