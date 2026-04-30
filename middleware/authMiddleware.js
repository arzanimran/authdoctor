const jwt = require("jsonwebtoken");// create token and verify token

const SECRET = process.env.JWT_SECRET; // jwt secret token to verify token

module.exports = (req, res, next) => {
  const token = req.headers.authorization;// JWT token from the request(postman or frontend)

  if (!token) {
    return res.json({ message: "No token provided" });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, SECRET);// check token is valid or not

    // attach user data
    req.user = decoded; //stores the logged-in user data

    next();  //token is valid now move to the next functio
  } catch (err) {
    res.json({ message: "Invalid token" });
  }
};


/*

Client -> sends request with token
        |
Middleware checks token
        |
Valid? > YES -> allow API
        |
NO -> block request

*/