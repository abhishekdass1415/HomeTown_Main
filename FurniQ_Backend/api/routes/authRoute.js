import express from "express";
import { registerUser, loginUser } from "../controllers/userCntrl.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
