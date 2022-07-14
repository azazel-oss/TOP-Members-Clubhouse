function indexGet(req, res, next) {}

function loginGet(req, res, next) {
  res.render("index/login", { title: "Clubhouse - Log in" });
}

function loginPost(req, res, next) {}

function signupGet(req, res, next) {
  res.render("index/signup", { title: "Clubhouse - Sign up" });
}

function signupPost(req, res, next) {}

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
