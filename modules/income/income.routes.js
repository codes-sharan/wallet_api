const express = require("express");
const auth = require("../../middlewares/auth");
const addIncome = require("./controllers/addIncome");

const incomeRouter = express.Router();

incomeRouter.use(auth);

incomeRouter.post("/add", addIncome);

module.exports = incomeRouter;
