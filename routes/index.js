const express = require("express");
const {
  indexGet,
  loginGet,
  loginPost,
  signupGet,
  signupPost,
  logoutGet,
  proGet,
  proPost,
} = require("../controllers/index");

const router = express.Router();

router.get("/", indexGet);

router.get("/log-in", loginGet);

router.post("/log-in", loginPost);

router.get("/sign-up", signupGet);

router.post("/sign-up", signupPost);

router.get("/logout", logoutGet);

router.get("/pro", proGet);

router.post("/pro", proPost);

module.exports = router;
