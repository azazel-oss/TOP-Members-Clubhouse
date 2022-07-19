const express = require("express");

const {
  newPostGet,
  newPostPost,
  deletePostGet,
  deletePostPost,
} = require("../controllers/post");

const router = express.Router();

router.get("/new", newPostGet);

router.post("/new", newPostPost);

router.get("/:postId", deletePostGet);

router.post("/:postId", deletePostPost);

module.exports = router;
