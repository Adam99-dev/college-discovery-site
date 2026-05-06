import jwt from "jsonwebtoken";

// generate token using JWT_SECRET
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
