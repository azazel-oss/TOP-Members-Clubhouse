const { body, validationResult } = require("express-validator");

const Post = require("../models/post");

function newPostGet(req, res) {
  if (!req.user) {
    return res.redirect("/log-in");
  }
  res.render("post/new.pug", { title: "Clubhouse - New Post" });
}

let newPostPost = [
  body("title", "Title should not be empty")
    .trim()
    .isLength({ min: 1 })
    .blacklist("<>"),
  body("text", "Text field should not be empty")
    .trim()
    .isLength({ min: 1 })
    .blacklist("<>"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!req.user) {
      return res.redirect("/log-in");
    }
    if (!errors.isEmpty()) {
      return res.render("new", {
        title: "Clubhouse - New Post",
        error: errors.errors[0],
      });
    }
    const newPost = new Post({
      title: req.body.title,
      message: req.body.text,
      author: req.user._id,
    });
    try {
      await newPost.save();
      const messages = await Post.find().populate("author");
      res.render("index/home", { title: "Clubhouse - Home", messages });
    } catch (err) {
      next(err);
    }
  },
];

async function deletePostGet(req, res, next) {
  const post = await Post.findById(req.params.postId).populate("author");

  if (req.user && req.user.admin)
    res.render("post/delete", { title: "Clubhouse - Delete Post", post });
  else return res.redirect("/");
}

async function deletePostPost(req, res, next) {
  if (!req.user || !req.user.admin) return res.redirect("/log-in");
  await Post.findByIdAndDelete(req.params.postId);
  res.redirect("/");
}

module.exports = { newPostGet, newPostPost, deletePostGet, deletePostPost };
