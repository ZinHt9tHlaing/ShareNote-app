const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req, res, next) => {
  // store token header
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Not Authenticated!" });
  }

  const token = authHeader.split(" ")[1]; // string to array
  //   [Bearer , token12fdsajfo] === [ 0 , 1 ]
  try {
    const tokenMatch = jwt.verify(token, process.env.JWT_KEY);
    if (!tokenMatch) {
      return res.status(401).json({ message: "Not Authenticated!" });
    }
    req.userId = tokenMatch.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not Authenticated!" });
  }
};

module.exports = isAuth;
