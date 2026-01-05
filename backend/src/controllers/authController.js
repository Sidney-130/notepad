const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { users } = require("../utils/users");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      throw new Error("Email and password required");
    }

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
      id: Date.now().toString(),
      email,
      passwordHash,
    };

    users.push(user);
    console.log(req.body);
    res.status(201).json({ message: "User created" });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error("Invalid Credentials");

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
