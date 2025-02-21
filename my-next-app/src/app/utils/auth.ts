// import jwt from "jsonwebtoken";

// const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// export const generateToken = (userId: string) => {
//   return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
// };

// export const verifyToken = (token: string) => {
//   try {
//     return jwt.verify(token, SECRET_KEY);
//   } catch (error) {
//     return null;
//   }
// };