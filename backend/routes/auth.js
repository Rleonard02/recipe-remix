import express from "express";
import { login, register, loginGoogle } from "../controllers/auth.js";
import { sendConfirmationEmail, confirmEmail } from "../controllers/auth.js";

const router = express.Router();

/* Set routes to redirect to the correct controller in /controllers/auth.js */
router.post("/login", login);
router.post("/register", register);
router.post("/loginGoogle", loginGoogle);

router.post('/send-confirmation-email', sendConfirmationEmail);
router.post("/confirm-email/:token", confirmEmail);


export default router;