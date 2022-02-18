const router = require("express").Router();
const { withAuth } = require("../utils/auth");
const { Podcast, Review, User } = require("../models");
// const api = require("podcast-index-api")(
//   "HH7AMGUBSPCX9GVK9CUD",
//   "CLj#K3RhpmHae3sW^PRNsKTuU#9uLhhpLX5W7BkZ"
// );

// Use the custom middleware before allowing the user to access reviews on podcasts.
router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// create review
router.get("/shareit", withAuth, async (req, res) => {
  const podcastsData = await Podcast.findAll(); // Server-side render

  const podcasts = podcastsData.map((podcast) => podcast.toJSON());

  res.render("shareit", {
    podcasts,
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id,
    username: req.session.username,
  });
});

// Logout route
router.get("/logout", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("logout");
});

module.exports = router;
