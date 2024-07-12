import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Genrate Random String

export const generateRandomText = (length) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomText = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomText += charset[randomIndex];
  }

  return randomText;
};
// Genrate Random String

export const generateOtp = (length) => {
  const charset =
    "0123456789";
  let randomText = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomText += charset[randomIndex];
  }

  return randomText;
};

// Password Hashing

export const passwordHashing = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(password, salt);
  return hash;
};

// Password Compare

export const passwordCompare = (password, dbPass) => {
  const compare = bcryptjs.compareSync(password, dbPass);
  return compare;
};

export const genrateToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET);
};

export const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};