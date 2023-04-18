"use strict";

const jwt = require("jsonwebtoken");

const auth = async(req, res, next) => {
  const authheader = req.headers["authorization"];
  // console.log(authheader)
  const token = authheader && authheader.split(" ")[1];
  // console.log(token);

  if (token === null) {
    res.status(400).json({ message: "Invalid authorization" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = { auth };
