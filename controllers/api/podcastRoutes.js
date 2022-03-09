// Search Spotify’s catalog for content:
// GET https://api.spotify.com/v1/search
// The search API now returns podcast shows and episodes. Set the type parameter to show or episode to query these new types of content.

// GET 'Content-Type: application/json
// Authorization: ff7ad461f66a4385a58a6c1bf443592c, client secret ff7ad461f66a4385a58a6c1bf443592c
// https://api.spotify.com/v1/search?type=show&q=bachelor&limit=10

const router = require("express").Router();
const { withAuth, withAuthJson } = require("../../utils/auth");
const { Review, Podcast, User } = require("../../models");

// POST /api/podcast -- create a new podcast and review
router.post("/", withAuthJson, async (req, res) => {
  try {

    const isUnique = await Podcast.findOne({
      where: {
        name: req.body.name
      }
    });
    
    if(isUnique){
      res.status(400).json({
        message: "This podcast already exists"
      })
    } 

    const podcastData = await Podcast.create({
      name:req.body.name
    })
    const podcasts = podcastData.toJSON();
    res.status(200).json(podcasts)
 
  } catch (err) {
    res.status(400).json({
      message: "Bad request",
    });
  }
});

module.exports = router;
