const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./modules/users/users.routes");
const incomeRouter = require("./modules/income/income.routes");
const addExpense = require("./modules/expenses/controllers/addExpense");
const expenseRouter = require("./modules/expenses/expense.routes");

require("dotenv").config();

const app = express();

app.use(express.json());

//Models

require("./models/users.model");
require("./models/transactions.model");

mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => {
    console.log("Connected to mongodb successfully!");
  })
  .catch((e) => {
    console.log("Connection to mongodb failed", e);
  });

//Routes
app.use("/users", userRouter);
app.use("/income", incomeRouter);
app.use("/expense", expenseRouter);

app.listen(8000, () => {
  console.log("Server started successfully");
});
