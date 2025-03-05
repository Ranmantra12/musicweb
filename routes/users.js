import express from "express";

const router = express.Router();

import { loginUser } from "../controllers/login.js";
import { registerUser } from "../controllers/register.js";
import { isTokenValid } from "../controllers/isTokenValid.js";
import { userProfile } from "../controllers/profile.js";
import { changePassword } from "../controllers/change-password.js";
import { deleteUser } from "../controllers/delete.js";
import { authorizedRoutes } from "../auth/auth.js";
import { updateUser } from "../controllers/updateUser.js";

router.get("/login");
router.post("/login", loginUser);

router.get("/register");
router.post("/register", registerUser);

router.post("/is-token-valid", authorizedRoutes, isTokenValid);

router.get("/profile", authorizedRoutes, userProfile);
router.post("/update",authorizedRoutes,updateUser)

router.post("/change-password", authorizedRoutes, changePassword);

router.delete("/delete-account/:id", authorizedRoutes, deleteUser);


export default router;
