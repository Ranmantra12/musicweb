// This is your backend code for registering the user
import User from "../models/user.js";
import { errorMessage, validateRegisterForm } from "../validations/users.js";
import { hashPassword } from "../auth/auth.js";

export const registerUser = async (req, res) => {
  const user = req.body;

  try {
    const validation = await validateRegisterForm(user);
    if (!validation) {
      return res.status(400).json({ message: errorMessage() });
    }

    hashPassword(user.password).then(async (hash) => {
      const { name, email } = user;
      const newUser = new User({
        name,
        email,
        password: hash,
      });

      const savedUser = await newUser.save();
      res.status(201).json({
        success: true,
        message: 'User registered successfully!',
        user: savedUser,
      });
    }).catch((error) => {
      console.error('Error hashing password:', error);
      return res.status(500).json({ message: 'Error hashing password' });
    });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ message: error.message });
  }
};
