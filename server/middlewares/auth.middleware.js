import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  // get a token, verfiy it and attach decoded payload to req

  const token = req.cookies.token;
  // console.log("Token: ", token);

  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized user", success: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded: ", decoded); // { userId: '681cf283b6aa242bcb854ef3', iat: 1747397226, exp: 1747483626 }
    req.userId = decoded.userId; // Attach userId to request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token", success: false });
  }
};
