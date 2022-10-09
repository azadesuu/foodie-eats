// middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  // if not logged in, redirect to login form
  res.redirect("/login");
}

module.exports = {
  isLoggedIn
};
