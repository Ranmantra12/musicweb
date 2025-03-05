import User from "../models/user.js";
import { changePassword } from "./change-password.js";
import { hashPassword, comparePassword } from "../auth/auth.js";
import {
  errorMessage,
  validateChangePasswordForm,
} from "../validations/users.js";
export const updateUser = async (req, res) => {
  const userInfo = req.body;

  try {
    if (validateChangePasswordForm(userInfo)) {
      let user = await User.findById({ _id: req.user._id });

      comparePassword(userInfo.password, user.password)
        .then((response) => {
          if (response) {
            res.status(400).json({
              message: "Choose a new password.",
            });
          } else {
            hashPassword(userInfo.password)
              .then(async (hash) => {
              user=  await User.findByIdAndUpdate(
                  { _id: req.user._id },
                  { password: hash, name: userInfo.name, email: userInfo.email },
                  {new:true}
                );

                res.status(200).json({
                  message: "User has been successfully updated.",
                  data:{user}
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: error.message,
                });
              });
          }
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    } else {
      res.status(400).json({ message: errorMessage() });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
