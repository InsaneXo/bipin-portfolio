import userModel from "../models/user-model.js";
import projectModel from "../models/project-modal.js";
import messageModel from "../models/message-model.js";
import { v2 as cloudinary } from "cloudinary";

import {
  generateRandomText,
  genrateToken,
  passwordCompare,
  passwordHashing,
} from "../utils/features.js";
import sendEmail from "../utils/sendEmail.js";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNo, address, bio, password } =
      req.body;

    const user = await userModel.create({
      firstName,
      lastName,
      email,
      phoneNo,
      address,
      bio,
      password,
      avatar: {
        public_id: "",
        url: "",
      },
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // If User empty this field

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email field should be required" });
    }

    // Finding email in Database

    const user = await userModel.findOne({ email });

    // If email does not exist

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Sorry Email not Found. Try different Email",
      });
    }

    // Creata a 10 digit Random Password

    const randomPassword = generateRandomText(10);

    // The random password convert into cipher text

    const passHashing = passwordHashing(randomPassword);

    user.password = passHashing;

    await user.save();

    let message = `Hi Bipin Singh this is your Password: ${randomPassword} to open an Admin Panel`;

    // Sent Email to the user using email

    try {
      await sendEmail({
        email: user.email,
        subject: "Welcome to Bipin Singh Portfolio",
        message,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Password is sent to your ${user.email}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password field should be required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Wrong email or password. \n Try again or create an account.",
      });
    }

    const isMatched = passwordCompare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Wrong email or password. Try again.",
      });
    }

    const token = genrateToken(user._id);

    const option = {
      expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res
      .status(200)
      .cookie("token", token, option)
      .json({ success: true, message: "Successfully signed in" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .select("-password")
      .populate("projects messages");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const contactUs = async (req, res) => {
  try {
    const { name, email, phoneNo, message } = req.body;
    const id = "66901b838756ffbeec29097c";

    if (!name || !email || !phoneNo || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All field are required" });
    }
    const onwer = await userModel.findById(id);

    const usermsg = await messageModel.create({
      name,
      email,
      phoneNo,
      message,
    });

    onwer.messages.push(usermsg._id);

    await onwer.save();

    try {
      await sendEmail({
        email: onwer.email,
        subject: `You Received a Messsage from ${name}`,
        message: `Email : ${email} \n Name: ${name} \n PhoneNo: ${phoneNo} \n Message: ${message} \n for more details Check your Admin Panel`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const replyMessage = async (req, res) => {
  try {
    const { textMsg } = req.body;
    const message = await messageModel.findById(req.params.id);
    const user = await userModel.findById(req.user._id);

    if (!textMsg) {
      return res
        .status(400)
        .json({ success: false, message: "All field Required" });
    }
    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message Not Found" });
    }

    try {
      await sendEmail({
        email: message.email,
        subject: "You Received a Messsage from Bipin Singh",
        message: textMsg,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    await messageModel.deleteOne(message._id);

    if (user.messages.includes(message._id)) {
      const index = user.messages.indexOf(message._id);
      user.messages.splice(index, 1);
      await user.save();
    }

    return res
      .status(200)
      .json({ success: true, message: `Message sent to ${message.email}` });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await messageModel.findById(req.params.id);
    const user = await userModel.findById(req.user._id);

    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    await messageModel.deleteOne({ _id: message._id });

    if (user.messages.includes(message._id)) {
      const index = user.messages.indexOf(message._id);
      user.messages.splice(index, 1);
      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "Message delete successfully" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addProject = async (req, res) => {
  try {
    const { projectTitle, projectLink, techStack, projectImage } = req.body;
    const user = await userModel.findById(req.user._id);

    const myCloud = await cloudinary.uploader.upload(projectImage, {
      folder: "project",
    });

    if (!projectTitle || !projectLink || !techStack) {
      return res
        .status(400)
        .json({ success: false, message: "All field are required" });
    }

    const addProject = await projectModel.create({
      projectTitle,
      projectLink,
      techStack,
      projectImage: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    user.projects.push(addProject._id);
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Project added successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.id);
    const user = await userModel.findById(req.user._id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project Not Found" });
    }
    await cloudinary.uploader.destroy(project.projectImage.public_id);

    await projectModel.deleteOne({ _id: project });

    if (user.projects.includes(project._id)) {
      const index = user.projects.indexOf(project._id);
      user.projects.splice(index, 1);
      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "Project Deleted Successfully" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.id);
    const { projectTitle, projectLink, techStack, projectImage } = req.body;

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project Not Found" });
    }

    if (projectTitle) {
      project.projectTitle = projectTitle;
    }
    if (projectLink) {
      project.projectLink = projectLink;
    }
    if (techStack) {
      project.techStack = techStack.split(",");
    }

    if (projectImage) {
      const myCloud = await cloudinary.uploader.upload(projectImage, {
        folder: "project",
      });

      await cloudinary.uploader.destroy(project.projectImage.public_id);
      project.projectImage.public_id = myCloud.public_id;
      project.projectImage.url = myCloud.secure_url;
    }

    await project.save();

    return res
      .status(200)
      .json({ success: true, message: "Update changes successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const project = async (req, res) => {
  try {
    const project = await projectModel.find();

    return res.status(200).json({ success: true, project });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNo, bio, address, avatar } =
      req.body;

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });
    }

    if (firstName) {
      user.firstName = firstName;
    }

    if (lastName) {
      user.lastName = lastName;
    }

    if (email) {
      user.email = email;
    }

    if (phoneNo) {
      user.phoneNo = phoneNo;
    }

    if (bio) {
      user.bio = bio;
    }

    if (address) {
      if (address.country) {
        user.address.country = address.country;
      }
      if (address.pincode) {
        user.address.pincode = address.pincode;
      }
      if (address.state) {
        user.address.state = address.state;
      }
      if (address.city) {
        user.address.city = address.city;
      }
    }

    if (avatar) {
      const myCloud = await cloudinary.uploader.upload(avatar, {
        folder: "avatar",
      });

      await cloudinary.uploader.destroy(user.avatar.public_id);
      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.secure_url;
    }

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Profile Update Successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    const option = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };
    const user = await userModel.findById(req.user._id);
    const randomPassword = generateRandomText(10);

    // The random password convert into cipher text

    const passHashing = passwordHashing(randomPassword);

    user.password = passHashing;

    await user.save();

    let message = `Hi Bipin Singh this is your Password: ${randomPassword} to open an Admin Panel`;

    // Sent Email to the user using email

    try {
      await sendEmail({
        email: user.email,
        subject: "Welcome to Bipin Singh Portfolio",
        message,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res
      .status(200)
      .cookie("token", null, option)
      .json({ success: true, message: "Logout Successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
