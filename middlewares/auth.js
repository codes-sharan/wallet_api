const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //Auth logic

  //   console.log(req.headers);

  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res.status(401).json({
      status: "failed",
      message: "Authorization failed! You must be logged in!",
    });
    return;
  }

  // Check auth header...
  const token = authorizationHeader.split("Bearer ")[1];

  try {
    const checkToken = jwt.verify(token, process.env.jwt_salt);
    req.user = checkToken;
  } catch (e) {
    res.status(401).json({
      status: "failed",
      message: "Authorization failed!! Invalid token!",
    });
    return;
  }

  next();
};

module.exports = auth;
