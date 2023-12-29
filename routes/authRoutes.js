import express from "express";
import {
  forgotPasswordController,
  providerLoginController,
  providerRegisterController,
  studentLoginController,
  studentRegisterController,
} from "../controllers/authController.js";

import formidable from "express-formidable"

const router = express.Router();

//REGISTER || POST

router.post("/student-register", studentRegisterController);

router.post("/student-login", studentLoginController);

router.post("/forgot-password", forgotPasswordController);

router.post("/admin-login", studentLoginController);

router.post("/provider-register",formidable(), providerRegisterController);

router.post("/provider-login", providerLoginController);
export default router;
