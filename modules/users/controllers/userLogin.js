const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const Users = mongoose.model("users");
  const { email, password } = req.body;
  //validations

  try {
    if (!email) throw "Please provide a email";
    if (!password) throw "Please provide a password";

    const getUser = await Users.findOne({
      email: email,
    });

    if (!getUser) throw "This email doesnot exist";

    const matched = await bcrypt.compare(password, getUser.password);

    if (!matched) throw "Email and password donot match";
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e,
    });
    return;
  }
  //everything is good

  const getUserForAccessToken = await Users.findOne({
    email: email,
  });

  const accessToken = jwt.sign(
    {
      _id: getUserForAccessToken._id,
      email: getUserForAccessToken.email,
      name: getUserForAccessToken.name,
    },
    process.env.jwt_salt,
    {
      expiresIn: "90 days",
    }
  );

  res.status(200).json({
    status: "User logged in successfully!",
    accessToken,
  });
};

module.exports = userLogin;
