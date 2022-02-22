const router = require("express").Router();
const { withAuth, withAuthJson } = require("../utils/auth");
const { Podcast, Review, User } = require("../models");
const { sequelize } = require("sequelize");
// const api = require("podcast-index-api")(
//   "HH7AMGUBSPCX9GVK9CUD",
//   "CLj#K3RhpmHae3sW^PRNsKTuU#9uLhhpLX5W7BkZ"
// );

// Use the custom middleware before allowing the user to access reviews on podcasts.
//get the dashboard
router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      loggedIn: req.session.loggedIn,
      toast: req.query.toast,
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
  res.render("login", {
    toast: req.query.toast,
  });
});

// get one podcast
router.get("/podcast/:id", withAuth, async (req, res) => {
  const podcastsData = await Podcast.findByPk(); // Server-side render

  const podcasts = podcastsData.map((podcast) => podcast.toJSON());

  res.render("podcast", {
    podcasts,
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id,
    username: req.session.username,
  });
});
//get all podcasts
router.get("/podcast", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk({
      where: {
        user_id: req.session.user_id,
      },
    });
    const podcastsData = await Podcast.findAll();
    const podcasts = podcastsData.toJSON();
    const users = userData.toJSON();

    res.render("podcast", {
      podcasts,
      users,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
      username: req.session.username,
    });
  } catch (err) {
    res.status(400).json({
      message: "Bad request",
    });
  }
});

//get all my reviews
router.get("/view", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        { model: Podcast, 
          attributes: ["id", "name"] },
      ],
      where: {
        user_id: req.session.user_id,
      },
    });
    const reviews = reviewData.map((review) => review.toJSON());

    res.render("view", {
      reviews,
      loggedIn: req.session.loggedIn,
    });
    console.log(reviews)
  } catch (err) {
    res.status(400).json({
      message:
        "THis is an Error. It's getting through to home route with auth. Testing if it is going here.",
    });
  }
});

//view one review
router.get("/view/:id", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }],
    });
    const reviews = reviewData.map((review) => review.toJSON());

    res.render("view", {
      reviews,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (err) {
    res.status(400).json({
      message: "Bad request",
    });
  }
});

// create review helper function to render the review page and pass podcast list to the user.
router.get("/review", withAuth, async (req, res) => {
  try {
    const podcastsData = await Podcast.findAll();
    // Server-side render
    const podcasts = podcastsData.map((podcast) => podcast.toJSON());

    res.render("review", {
      podcasts,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
      username: req.session.username,
    });
  } catch (err) {
    res.status(400).json({
      message: "Bad request",
    });
  }
});

// Logout route
router.get("/logout", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("logout", {
    toast: req.query.toast,
  });
});

module.exports = router;
