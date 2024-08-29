const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const User = mongoose.model("users");
  const Transaction = mongoose.model("transactions");

  const getTransactions = await Transaction.find({
    user_id: req.user._id,
  })
    .sort("-createdAt")
    .select("remarks amount transaction_type")
    .limit(5);

  const getUserData = await User.findOne({
    _id: req.user._id,
  }).select("balance name");

  // console.log(req.user);

  res.status(200).json({
    // status: "This is dashboard!",
    data: getUserData,
    transactions: getTransactions,
  });
};

module.exports = userDashboard;
