const router = require("express").Router();
const { withAuthJson } = require("../../utils/auth");
const { Review, Podcast, User } = require("../../models");

//get one review
router.get("/:id", withAuthJson, async (req, res) => {
  try {
    const reviewData = await Review.findByPk({
      ...req.body,
      user_id: req.session.user_id,
      podcast_id: req.session.podcast_id,
    });

    const review = reviewData.toJSON();

    res.json(review);
  } catch (err) {
    res.status(400).json({
      message: "Bad request",
    });
  }
});

// POST /api/reviews -- create one review
router.post("/", withAuthJson, async (req, res) => {
  try {
    const reviewData = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    const review = reviewData.toJSON();

    res.json(review);
  } catch (err) {
    res.status(400).json({
      message: "Bad request",
    });
  }
});

// GET /api/reviews/ -- get all reviews
router.get("/", withAuthJson, async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [{ model: Podcast }],
    });
    const review = reviewData.toJSON();

    res.json(review);
  } catch (err) {
    res.status(400).json({
      message: "Bad request",
    });
  }
});
// PUT /api/reviews/:id -- update one review

router.put("/:id", withAuthJson, async (req, res) => {
  try {
    const reviewData = await Review.update(
      {
        rating: req.body.rating,
        review: req.body.review,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(reviewData);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Bad request",
    });
  }
});

// DELETE /api/reviews/:id -- delete one review
router.get("/", withAuthJson, async (req, res) => {
  try {
    const reviewDelete = await Review.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!reviewDelete) {
      res.status(404).json({ message: "No review exists for this id" });
      return;
    }

    res.status(200).json(reviewDelete);
  } catch (err) {
    res.status(400).json({
      message: "Bad request",
    });
  }
});

module.exports = router;
