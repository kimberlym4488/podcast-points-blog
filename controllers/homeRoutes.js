const router = require("express").Router();
const { withAuth, withAuthJson } = require("../utils/auth");
const { Podcast, Review, User, Interest } = require("../models");
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
  res.render("login", {});
});

//signup
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

// get all podcast and reviews. No login required.
router.get("/podcasts", async (req, res) => {
  try {
    const reviewsData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        { model: Podcast, attributes: ["id", "name"] },
      ],
      order: [["rating", "DESC"]],
    });

    const reviews = reviewsData.map((review) => review.toJSON());
    console.log(reviews);
    res.render("podcasts", {
      reviews,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(400).json({
      message: "Request denied.",
    });
  }
});

//get username passed through to the create podcast page, render podcast handlebars
router.get("/podcast", withAuthJson, async (req, res) => {
  try {
    res.render("create", {
      user_id: req.session.user_id,
      loggedIn: req.session.loggedIn,
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
        { model: Podcast, attributes: ["id", "name"] },
      ],
      where: {
        user_id: req.session.user_id,
      },
      order: [["name", "ASC"]],
    });
    const reviews = reviewData.map((review) => review.toJSON());

    res.render("view", {
      reviews,
      loggedIn: req.session.loggedIn,
    });
    console.log(reviews);
  } catch (err) {
    res.status(400).json({
      message: "Error",
    });
  }
});

//view one review
router.get("/review/:id", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findOne({
      where: {
        id: req.params.id,
      },

      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Podcast,
          attributes: ["id", "name"],
        },
      ],
    });

    const reviews = reviewData.toJSON();
    console.log(reviews);
    res.render("reviewone", {
      reviews,
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
    const podcastsData = await Podcast.findAll({
      order: [["name", "ASC"]],
    });
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
  res.render("signup");
});

module.exports = router;
