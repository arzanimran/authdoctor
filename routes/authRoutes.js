const express = require("express"); // create routes.
const router = express.Router(); //creates a mini app inside Express

const {
  register,
  login,
} = require("../controllers/authController"); 

// register API
router.post("/register", register);

// login API
router.post("/login", login);

module.exports = router;