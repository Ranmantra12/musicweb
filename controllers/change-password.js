import User from "../models/user.js";
import {
    errorMessage,
    validateChangePasswordForm,
} from "../validations/users.js";
import { hashPassword, comparePassword } from "../auth/auth.js";

export const changePassword = async (req, res) => {
    const userInfo = req.body;

    try {
        if (validateChangePasswordForm(userInfo)) {
            const user = await User.findById({ _id: req.user._id });

            comparePassword(userInfo.password, user.password)
                .then((response) => {
                    if (response) {
                        res.status(400).json({
                            message: "Choose a new password.",
                        });
                    } else {
                        hashPassword(userInfo.password)
                            .then(async (hash) => {
                                await User.findByIdAndUpdate(
                                    { _id: req.user._id },
                                    { password: hash }
                                );

                                res.status(200).json({
                                    message:
                                        "Password has been successfully updated.",
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
