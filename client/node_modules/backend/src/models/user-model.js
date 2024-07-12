import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  address: {
    country: {
      type: String,
    },
    pincode: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
