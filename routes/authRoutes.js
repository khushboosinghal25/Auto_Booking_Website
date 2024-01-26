import express from "express";
import {
  changeAccountStatusController,
  createPlaceController,
  deleteAllNotificationController,
  forgotPasswordController,
  getAllNotificationController,
  getAllPlacesController,
  getAllProvidersController,
  getAllStudentsController,
  providerLoginController,
  providerRegisterController,
  setTimeController,
  studentLoginController,
  studentRegisterController,
  updateProfileController,
  updateProviderProfileController,
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

router.put("/profile", requireSignIn, updateProfileController);

router.put("/provider-profile", requireSignIn, updateProviderProfileController);

//get all autos
router.get("/getAllProviders", getAllProvidersController);

router.get("/getAllStudents", requireSignIn, isAdmin, getAllStudentsController);

// create places

router.post("/create-places", requireSignIn, isAdmin, createPlaceController);
router.get("/getAllPlaces", getAllPlacesController);

//Notification
router.post("/getAllNotification", requireSignIn, getAllNotificationController);

router.post(
  "/deleteAllNotification",
  requireSignIn,
  deleteAllNotificationController
);

//account status
router.post(
  "/changeAccountStatus",
  requireSignIn,
  isAdmin,
  changeAccountStatusController
);

//set time
router.post("/settime",requireSignIn,isProvider,setTimeController);
export default router;
