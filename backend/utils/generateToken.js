import jwt from "jsonwebtoken";

const generateToken = (id, isAdmin = false) => {
  return jwt.sign(
    { id, isAdmin }, 
    process.env.JWT_SECRET, 
    { expiresIn: "30d" } // token valid for 30 days
  );
};

export default generateToken;
