const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const passport = require("passport");
function indexGet(req, res, next) {}

function loginGet(req, res, next) {
  res.render("index/login", { title: "Clubhouse - Log in" });
}

let loginPost = [
  body("username", "Username should not be empty")
    .isLength({ min: 1 })
    .blacklist("<>"),
  body("password", "Password should not be empty")
    .isLength({ min: 1 })
    .blacklist("<>"),
  passport.authenticate("local", {
    failureRedirect: "/log-in",
  }),
  (req, res, next) => {
    console.log(req.user);
    res.render("index/login", { title: "Clubhouse - Log In" });
  },
];

function signupGet(req, res, next) {
  res.render("index/signup", { title: "Clubhouse - Sign up" });
}

let signupPost = [
  body("firstname", "First Name should not be empty")
    .isLength({ min: 1 })
    .blacklist("<>"),
  body("lastname", "Last Name should not be empty")
    .isLength({ min: 1 })
    .blacklist("<>"),
  body("username", "Username should not be empty")
    .isLength({ min: 1 })
    .blacklist("<>"),
  body("password", "Password should not be empty")
    .isLength({ min: 1 })
    .blacklist("<>"),
  body("cnfpassword", "Passwords should match").custom(
    (value, { req }) => value === req.body.password
  ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("index/signup", {
        title: "Clubhouse - Sign Up",
        error: errors.errors[0],
      });
    }
    bcrypt.hash(req.body.password, 12, async (err, hash) => {
      if (err) return next(err);
      const newUser = new User({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        username: req.body.username,
        password: hash,
      });
      await newUser.save();
    });
    res.render("index/login", { title: "Clubhouse - Log In" });
  },
];

function logoutGet(req, res, next) {}

function proGet(req, res, next) {}

function proPost(req, res, next) {}

module.exports = {
  indexGet,
  loginGet,
  loginPost,
  signupGet,
  signupPost,
  logoutGet,
  proGet,
  proPost,
};
