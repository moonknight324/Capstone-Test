const jwt = require("jsonwebtoken");
const userModel = require("../models/User.js");

var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      //Get token from header
      token = authorization.split(" ")[1];

      //Verify token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(userID)

      //Get user from token
      req.user = await userModel.findById(userID).select("-password");
      next();
    } catch (error) {
      res.status(401).send({ status: "failed", message: "Unauthorized User" });
    }
  }
  if (!token) {
    res
      .status(401)
      .send({ status: "failed", message: "Unauthorized User, No token" });
  }
};

module.exports = checkUserAuth;
