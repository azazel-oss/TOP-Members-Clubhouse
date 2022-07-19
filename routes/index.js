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
  adminGet,
  adminPost,
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

router.get("/admin", adminGet);

router.post("/admin", adminPost);

module.exports = router;
