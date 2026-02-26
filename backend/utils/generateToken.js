// // import jwt from "jsonwebtoken";

// // const generateToken = (res, userId) => {
// //   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
// //     expiresIn: "7d",
// //   });

// //   res.cookie("token", token, {
// //     httpOnly: true,
// //     secure: process.env.NODE_ENV === "production",
// //     sameSite: "strict",
// //     maxAge: 7 * 24 * 60 * 60 * 1000,
// //   });
// // };

// // export default generateToken;

import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,        // localhost me false
    sameSite: "lax",      // 👈 CHANGE THIS
    path: "/",            // 👈 ADD THIS
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;

// res.cookie("token", token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "lax",
// });