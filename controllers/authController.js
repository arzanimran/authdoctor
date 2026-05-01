const User = require("../models/User");
const bcrypt = require("bcrypt");//used to hash passwords before saving them in the database
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET; // JWT secret

// ---------------- register ----------------
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // password hash (security)
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.json({
      message: "User registered successfully",
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

// ---------------- login ----------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Wrong password" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};