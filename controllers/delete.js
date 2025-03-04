import User from "../models/user.js";

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById({ _id: id });

        if (user) {
            if (user._id.toString() === req.user._id.toString()) {
                
                const deletedUser = await User.findByIdAndDelete({
                    _id: user._id,
                });

                res.status(200).json({
                    message: "Account has been successfully deleted.",
                    user: { name: deletedUser.name },
                });
            } else {
         
                res.status(400).json({
                    message: "Can not delete an account that is not yours.",
                });
            }
        } else {
            res.status(400).json({
                message: "There is no user with this id",
                id: req.params.id,
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
