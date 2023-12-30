import express from "express";
import {
  forgotPasswordController,
  providerLoginController,
  providerRegisterController,
  studentLoginController,
  studentRegisterController,
} from "../controllers/authController.js";
import {
  isAdmin,
  isProvider,
  isStudent,
  requireSignIn,
} from "../middlewares/authMiddleware.js";

import formidable from "express-formidable";

const router = express.Router();

//REGISTER || POST

router.post("/student-register", studentRegisterController);

router.post("/student-login", studentLoginController);

router.post("/forgot-password", forgotPasswordController);

router.post("/admin-login", studentLoginController);

router.post("/provider-register", formidable(), providerRegisterController);

router.post("/provider-login", providerLoginController);

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Student route auth

router.get("/student-auth", requireSignIn, isStudent, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Provider route auth
router.get("/provider-auth", requireSignIn, isProvider, (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;
