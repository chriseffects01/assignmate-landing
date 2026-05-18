import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../model/user.js";

export async function registerUser(req, res) {
  try {
    const {
      firstName,
      lastName,
      username,
      email,

      password,
    } = req.body;
    //check existing user
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    // Create token

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //return response
    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error",
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    //compare passwords

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status($00).json({ message: "Invalid credentials" });
    }

    // Create token

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    //send response
    res.status(200).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Server error" });
  }
}
