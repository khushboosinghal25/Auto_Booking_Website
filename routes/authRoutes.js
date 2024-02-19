import express from "express";
import {
  blockUserController,
  bookAutoController,
  changeAccountStatusController,
  confirmEmailController,
  createPlaceController,
  deleteAllNotificationController,
  deletePlaceController,
  forgotPasswordController,
  getAllBlockedController,
  getAllBookingsController,
  getAllNotificationController,
  getAllPlacesController,
  getAllProvidersController,
  getAllStudentsController,
  getProviderByIdController,
  getSelectedProvidersController,
  handleAvailibiltiyController,
  providerBookingController,
  providerLoginController,
  providerRegisterController,
  setProviderRatingController,
  setTimeController,
  studentBookingController,
  studentLoginController,
  studentRegisterController,
  unblockUserController,
  updatePlaceController,
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

router.get("/getSelectedProviders",getSelectedProvidersController);

router.get("/getAllStudents", requireSignIn, isAdmin, getAllStudentsController);

router.get("/getAllBlocked", requireSignIn, isAdmin, getAllBlockedController);

// create places

router.post("/create-places", requireSignIn, isAdmin, createPlaceController);
router.get("/getAllPlaces", getAllPlacesController);

router.delete(
  "/deletePlace/:id",
  requireSignIn,
  isAdmin,
  deletePlaceController
);
router.put("/updatePlace/:id", requireSignIn, isAdmin, updatePlaceController);

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

//block user
router.post("/block-user", requireSignIn, isAdmin, blockUserController);

router.post("/unblock-user", requireSignIn, isAdmin, unblockUserController);

//set time
router.post("/settime", requireSignIn, isProvider, setTimeController);

//get single provider info
router.post("/getProviderById", getProviderByIdController);

//book appointment
router.post("/book-auto", requireSignIn, bookAutoController);

//booking availibility
router.post(
  "/handle-availibility",
  requireSignIn,
  handleAvailibiltiyController
);

// get student bookings
router.post("/student-bookings", requireSignIn, studentBookingController);

// rate provider 
router.post("/rate-provider",requireSignIn,isStudent,setProviderRatingController)

//get provider bookings
router.post("/provider-bookings", requireSignIn, providerBookingController);

// get all bookings 
router.get("/getAllBookings",requireSignIn,isAdmin,getAllBookingsController);

//confirm email
router.get("/confirm/:token", confirmEmailController);
export default router;
