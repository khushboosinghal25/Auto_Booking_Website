import studentModel from "../models/studentModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import ProviderModel from "../models/ProviderModel.js";
import fs from "fs";
import PlacesModel from "../models/PlacesModel.js";
import slugify from "slugify";
import dotenv from "dotenv";

dotenv.config();

export const studentRegisterController = async (req, res) => {
  try {
    const { name, email, password, phone, gender, answer } = req.body;

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

    if (!gender) {
      return res.send({ message: "Gender is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    const existingUser = await studentModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = new studentModel({
      name,
      email,
      phone,
      gender,
      password: hashedPassword,
      answer,
    }).save();
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
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        role: user.role,
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
        name: user.name,
        email: user.email,
        phone: user.phone,
        autonumber: user.autonumber,
        capacity: user.capacity,
        role: user.role,
        license:user.license,
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

export const updateProfileController = async (req,res) =>{
  try {
    const {name,email,password,phone} = req.body;
    const user = await studentModel.findById(req.user._id);

   
    if (!password) {
      return res.status(400).json({ error: "Password is not allowed for update" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined

    const updatedUser = await studentModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone:phone || user.phone,
        email:email || user.email,
      },
      {new: true}
    )
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
      error:error.message,
    });
  }
}




export const updateProviderProfileController = async (req,res) =>{
  try {
    const {name,email,password,phone,capacity,autonumber} = req.body;
    const user = await ProviderModel.findById(req.user._id);

   
    if (!password) {
      return res.status(400).json({ error: "Password is not allowed for update" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined

    const updatedUser = await ProviderModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone:phone || user.phone,
        email:email || user.email,
        capacity:capacity || user.capacity,
        autonumber:autonumber || user.autonumber,
      },
      {new: true}
    )
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
      error:error.message,
    });
  }
}


export const getAllProvidersController = async(req,res)=>{
  try {
    const providers = await ProviderModel.find({})
    res.status(200).send({
      success:true,
      message:"Providers data list",
      data:providers,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error while fetching Providers'
    })
  }
}

export const getAllStudentsController = async(req,res) => {
  try {
    const students  = await studentModel.find({});
    res.status(200).send({
      success:true,
      message:"students data list",
      data:students,
    }) 
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message:"Error while fetching students"
    })
  }
}


export const createPlaceController = async (req,res)=>{
  try {
      const {name} = req.body
      if(!name){
        return res.status(401).send({message:"Name is required"})
      }
      const existingPlace = await PlacesModel.findOne({name})
      if(existingPlace){
        res.status(200).send({
          success:true,
          message:"Places already exist",
        })
      }
      const place = await new PlacesModel({name,slug:slugify(name)}).save()
      res.status(201).send({
        success:true,
        message:"New Place added",
        place
      })
  } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"Error in Places"
    })
  }
}


export const getAllPlacesController = async(req,res) =>{
  try {
    const places = await PlacesModel.find({});
    res.status(200).send({
      success:true,
      message:"All Places List",
      places,
    })
    
  } catch (error) {
    console.log(error)
  }
}