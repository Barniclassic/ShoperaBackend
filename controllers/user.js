const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const newuser = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  try {
    const savedUser = await newuser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    !user && res.status(401).json("INCORRECT USER CREDENTIALS");
    const isValid = bcrypt.compareSync(req.body.password, user.password);
    if (isValid) {
      const token = jwt.sign(
        {_id: user._id, username: user.username, isAdmin: user.isAdmin },
        process.env.PRIVATE_KEY,
        { expiresIn: "7d" }
      );
      res.status(200).json({_id: user._id, isAdmin: user.isAdmin, token});
    } else {
      res.status(401).json("INCORRECT USER CREDENTIALS");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// VERIFY TOKEN FOR AUTHORIZATION
exports.authorize = async (req, res, next) => {
  const authoToken = req.headers.authorization;
  if (authoToken) {
    const token = authoToken.split(" ")[1];
    jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
      if (err) {
        if (err.message === "jwt expired") {
          res.send("SESSION EXPIRED...PLEASE LOG IN AGAIN");
        }
        res.status(403).send("FORBIDDEN");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).send("UNAUTHORIZED");
  }
};

// GIVE CERTAIN PRIVILAGE OR AUTHORIZATION TO ADMIN ONLY(MIDDLEWARE)
exports.adminPrivilage = (req, res, next) => {
  req.user.isAdmin ? next() : res.status(403).send("FORBIDDEN FOR THIS USER");
};

// GET A USER
exports.getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const { password, ...others } = user._doc;
    res.status(200).send(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL USERS
exports.getUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await UserModel.find().sort({ _id: -1 }).limit(5)
      : await UserModel.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
  }
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.userId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.userId);
    res.status(200).send("SUCCESSFULLY DELETED USED");
  } catch (err) {
    res.status(500).json(err);
  }
};


// ADMIN ADD USER
exports.createUser = async (req, res) => {
  const newUser = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};