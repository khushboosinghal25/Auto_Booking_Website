import studentModel from "../models/studentModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import ProviderModel from "../models/ProviderModel.js";
import fs from "fs";
import PlacesModel from "../models/PlacesModel.js";
import slugify from "slugify";
import dotenv from "dotenv";
import BookingModel from "../models/BookingModel.js";
import moment from "moment";
import Token from "../models/Token.js";
import  crypto from "crypto"
import verifmail from "../utils.js";

dotenv.config();

export const studentRegisterController = async (req, res) => {
  try {
    const { name, email, password, phone, gender, answer } = req.body;

    if (!name || !email || !password || !phone || !gender || !answer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await studentModel.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "Already registered, please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    // Create a new student
    const newUser = await studentModel.create({
      name,
      email,
      phone,
      gender,
      password: hashedPassword,
      answer,
    });

    // Generate verification token
    const token = new Token({
      userId: newUser._id,
      token: crypto.randomBytes(16).toString("hex"),
    });

    // Save the token
    await token.save();

    // Send verification email
    const link = `http://localhost:8080/api/v1/auth/confirm/${token.token}`;
    await verifmail(email, link);

    return res.status(201).json({
      success: true,
      message: "User registered successfully. Verification email sent.",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};


export const confirmEmailController = async(req,res)=>{
    try {
      const token = await Token.findOne({
        token: decodeURIComponent(req.params.token),
      })
      await studentModel.updateOne({_id:token.userId},{$set:{verified:true}})
      await Token.findByIdAndDelete(token._id);
      res.send("Email verified successfully You can now Login");
    } catch (error) {
      res.status(400).send("An error occured");
    }
}

export const studentLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await studentModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    if(!user.verified && user.role == 0){
      return res.status(401).send({
        success:false,
        message:"You have to verify your account"
      })
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        role: user.role,
        notification: user.notification,
        seennotification: user.seennotification,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }

    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }

    const user1 = await studentModel.findOne({ email, answer });
    const user2 = await ProviderModel.findOne({ email, answer });

    if (!user1 && !user2) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Question",
      });
    }

    const hashed = await hashPassword(newPassword);

    if (user1) {
      await studentModel.findByIdAndUpdate(user1._id, { password: hashed });
    }
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const providerRegisterController = async (req, res) => {
  try {
    const { name, email, password, phone, autonumber, capacity, answer } =
      req.fields;
    const { license } = req.files;

    if (!name) {
      return res.send({ message: "Name is Required" });
    }

    if (!email) {
      return res.send({ message: "Email is Required" });
    }

    if (!password) {
      return res.send({ message: "Password is Required" });
    }

    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }

    if (!autonumber) {
      return res.send({ message: "Auto Number is Required" });
    }

    if (!capacity) {
      return res.send({ message: "Capacity is Required" });
    }

    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    if (!license) {
      return res.send({ message: "License is Required" });
    }

    const existingUser = await ProviderModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = new ProviderModel({
      name,
      email,
      phone,
      autonumber,
      capacity,
      password: hashedPassword,
      answer,
    });

    if (license) {
      user.license.data = fs.readFileSync(license.path);
      user.license.contentType = license.contentType;
    }

    await user.save();

    const adminUser = await studentModel.findOne({ role: 1 });
    const notification = adminUser.notification;
     notification.push({
      type: "Provider registered",
      message: `${user.name} has registered as a service provider`,
      // data: {
      //   providerId: user._id,
      //   name: user.name,
      // },
      onClickPath: "/dashboard/admin/providers",
    });
    await studentModel.findByIdAndUpdate(adminUser._id, { notification });

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const providerLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await ProviderModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        autonumber: user.autonumber,
        capacity: user.capacity,
        role: user.role,
        license: user.license,
        notification: user.notification,
        seennotification: user.seennotification,
        timings: user.timings,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const user = await studentModel.findById(req.user._id);

    if (!password) {
      return res
        .status(400)
        .json({ error: "Password is not allowed for update" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await studentModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        email: email || user.email,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating profile",
      error: error.message,
    });
  }
};

export const updateProviderProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, capacity, autonumber } = req.body;
    const user = await ProviderModel.findById(req.user._id);

    if (!password) {
      return res
        .status(400)
        .json({ error: "Password is not allowed for update" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await ProviderModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        email: email || user.email,
        capacity: capacity || user.capacity,
        autonumber: autonumber || user.autonumber,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating profile",
      error: error.message,
    });
  }
};

export const getAllProvidersController = async (req, res) => {
  try {
    const providers = await ProviderModel.find({});
    res.status(200).send({
      success: true,
      message: "Providers data list",
      data: providers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching Providers",
    });
  }
};

export const getAllStudentsController = async (req, res) => {
  try {
    const students = await studentModel.find({});
    res.status(200).send({
      success: true,
      message: "students data list",
      data: students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching students",
    });
  }
};

export const createPlaceController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingPlace = await PlacesModel.findOne({ name });
    if (existingPlace) {
      res.status(200).send({
        success: true,
        message: "Places already exist",
      });
    }
    const place = await new PlacesModel({ name, slug: slugify(name) }).save();
    res.status(201).send({
      success: true,
      message: "New Place added",
      place,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Places",
    });
  }
};

export const getAllPlacesController = async (req, res) => {
  try {
    const places = await PlacesModel.find({});
    res.status(200).send({
      success: true,
      message: "All Places List",
      places,
    });
  } catch (error) {
    console.log(error);
  }
};

// notification cntrl

export const getAllNotificationController = async (req, res) => {
  try {
    let user;
    user = await studentModel.findOne({ _id: req.body.userId });
    console.log("Student Model User:", user);
    if (!user) {
      user = await ProviderModel.findOne({ _id: req.body.userId });
      console.log("Provider Model User:", user);
    }

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const seennotification = user.seennotification || [];
    seennotification.push(...user.notification);
    user.notification = [];
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "All Notifications marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

export const deleteAllNotificationController = async (req, res) => {
  try {
    let user;

    user = await studentModel.findOne({ _id: req.body.userId });

    if (!user) {
      user = await ProviderModel.findOne({ _id: req.body.userId });
    }
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to delete all notifications",
      error,
    });
  }
};

export const changeAccountStatusController = async (req, res) => {
  try {
    const { providerId, status } = req.body;
    const provider = await ProviderModel.findByIdAndUpdate(
      providerId,
      { status },
      { new: true }
    );

    if (!provider) {
      return res.status(404).send({
        success: false,
        message: "Provider not found",
      });
    }

    const notification = provider.notification;
    notification.push({
      type: "Provider-account-request-updated",
      message: `Your Request to provide Auto Rickshaw Has ${status} 
             You can set your availibility timing to start getting bookings`,
      onClickPath: "/dashboard/provider/set-time",
    });

    await provider.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: provider,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in changing status",
      error,
    });
  }
};

export const setTimeController = async (req, res) => {
  try {
    const { userId, timings } = req.body;

    const provider = await ProviderModel.findByIdAndUpdate(userId, { timings });

    await provider.save();
    res.status(201).send({
      success: true,
      message: "Timings updated",
      data: provider,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating time",
      error,
    });
  }
};

// get single provider

export const getProviderByIdController = async (req, res) => {
  try {
    const provider = await ProviderModel.findOne({ _id: req.body.providerId });
    res.status(200).send({
      success: true,
      message: "Single Provider Info Fetched",
      data: provider,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting single provider info",
    });
  }
};

//book -auto

export const bookAutoController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newBooking = new BookingModel(req.body);
    await newBooking.save();

    const user = await ProviderModel.findOne({
      _id: req.body.providerInfo._id,
    });
    user.notification.push({
      type: "New Booking Request",
      message: `A new Booking request from ${req.body.userInfo.name}`,
      onClickPath: "/dashboard/provider/provider-bookings",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Auto Booked Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while booking auto",
    });
  }
};

export const handleAvailibiltiyController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();

    const providerId = req.body.providerId;

    const provider = await ProviderModel.findOne({ _id: providerId });
    const providerTimings = provider.timings;

    if (
      moment(req.body.time, "HH:mm").isBefore(
        moment(providerTimings[0], "HH:mm")
      ) ||
      moment(req.body.time, "HH:mm").isAfter(
        moment(providerTimings[1], "HH:mm")
      )
    ) {
      return res.status(200).send({
        message: "Booking not available at this time",
        success: false,
      });
    }

    const bookings = await BookingModel.find({
      providerId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (bookings.length >= 6) {
      return res.status(200).send({
        message: "Booking not available at this time",
        success: false,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Bookings Available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Booking",
    });
  }
};

// get all students bookings

export const studentBookingController = async (req, res) => {
  try {
    const userId = req.body.userId;

    const student = await studentModel.findOne({ _id: userId });

    const bookings = await BookingModel.find({ userId: userId });

    res.status(200).send({
      success: true,
      message: "my bookings list",
      bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Not able to fetch Bookings",
      error,
    });
  }
};

//get all providers bookings

export const providerBookingController = async (req, res) => {
  try {
    const providerId = req.body.providerId;
    const bookings = await BookingModel.find({ providerId: providerId });

    res.status(200).send({
      success: true,
      message: "My bookings list",
      bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Not able to fetch Bookings",
      error,
    });
  }
};
