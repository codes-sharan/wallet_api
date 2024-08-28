const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  const Users = mongoose.model("users");

  const { name, email, password, balance, address } = req.body;

  //validation logic

  //Creation code
  const encPassword = await bcrypt.hash(password, 10);

  try {
    const createdUser = await Users.create({
      name,
      email,
      password: encPassword,
      balance,
      address,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
    return;
  }

  res.status(200).json({
    status: "Hello from userRegister",
  });
};

module.exports = userRegister;
