const mongoose = require("mongoose");

const addIncome = async (req, res) => {
  const Users = mongoose.model("users");

  const { amount, remarks } = req.body;

  try {
    if (!amount) throw "Please enter amount!";
    if (amount < 1) throw "Amount must be more than 1!";

    if (!remarks) throw "Remarks is required!";
    if (remarks.length < 2) throw "Remarks must be atleast 2 char long";
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e,
    });
    return;
  }

  // success ....

  await Users.updateOne(
    {
      _id: req.user._id,
    },
    {
      $inc: {
        balance: amount,
      },
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "Income was updated",
  });
};

module.exports = addIncome;
