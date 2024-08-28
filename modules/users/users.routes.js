const express = require("express");
const userRegister = require("./controllers/userRegister");
const userLogin = require("./controllers/userLogin");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middlewares/auth");
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

// Protected route...

userRouter.use(auth);

userRouter.get("/dashboard", userDashboard);

module.exports = userRouter;
