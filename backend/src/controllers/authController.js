const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { users, saveUsers } = require("../utils/users");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    if (password.length < 6) {
      const error = new Error("Password must be at least 6 characters long");
      error.statusCode = 400;
      throw error;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const error = new Error("Please enter a valid email address");
      error.statusCode = 400;
      throw error;
    }

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      const error = new Error("An account with this email already exists");
      error.statusCode = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
      id: Date.now().toString(),
      email,
      passwordHash,
    };

    users.push(user);
    saveUsers();
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    const user = users.find((u) => u.email === email);
    if (!user) {
      const error = new Error("No account found with this email address");
      error.statusCode = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      const error = new Error("Incorrect password. Please try again");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login };
