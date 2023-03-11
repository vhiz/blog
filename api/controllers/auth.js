const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { User } = require("../model/User");
require("dotenv/config");

const register = async (req, res) => {
  const user = await User.findOne({
    username: { $regex: new RegExp(req.body.username, "i") },
  });

  const email = await User.findOne({
    email: { $regex: new RegExp(req.body.email, "i") },
  });

  if (user) return res.status(409).json("User Already Exist");

  if (email) return res.status(409).json("User Already Exist");

  const salt = genSaltSync(10);
  const password = hashSync(req.body.password, salt);

  try {
    await User.create({
      ...req.body,
      password: password,
    });

    res.status(201).json("user created");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const user = await User.findOne({
    email: { $regex: new RegExp(req.body.email, "i") },
  });

  if (!user) res.status(404).json("User not found");

  const valid = compareSync(req.body.password, user.password);

  if (!valid) return res.status(403).json("Invalid input");

  const token = sign({ id: user._id }, process.env.KEY);

  const { password, ...other } = user._doc;
  res.cookie("__session", token, { httpOnly: true }).status(200).json(other);
};

const google = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = sign({ id: user._id }, process.env.KEY);
      const { password, ...other } = user._doc;
      res
        .cookie("__session", token, { httpOnly: true })
        .status(200)
        .json(other);
    } else {
      const newUser = await User.create({
        ...req.body,
      });

      const token = sign({ id: newUser._id }, process.env.KEY);
      const { password, ...other } = newUser._doc;
      res
        .cookie("__session", token, { httpOnly: true })
        .status(200)
        .json(other);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const Logout = async (req, res) => {
  res.cookie("__session", "", { httpOnly: true }).status(200).json("Loged out");
};

module.exports = { register, login, google, Logout };
