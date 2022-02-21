// Search Spotify’s catalog for content:
// GET https://api.spotify.com/v1/search
// The search API now returns podcast shows and episodes. Set the type parameter to show or episode to query these new types of content.

// GET 'Content-Type: application/json
// Authorization: ff7ad461f66a4385a58a6c1bf443592c, client secret ff7ad461f66a4385a58a6c1bf443592c
// https://api.spotify.com/v1/search?type=show&q=bachelor&limit=10

const router = require("express").Router();
const { withAuth, withAuthJson } = require("../../utils/auth");
const { Review, Podcast, User } = require("../../models");

// POST /api/podcast -- create a new podcast
router.post("/", withAuthJson, async (req, res) => {
  try {
    const podcastData = await Podcast.create({
      ...req.body,
      user_id: req.session.user_id,
      username: req.session.username,
    });

    const podcasts = podcastData.toJSON();

    res.json(podcasts);
  } catch (err) {
    res.status(400).json({
      message: "Bad request",
    });
  }
});

module.exports = router;
