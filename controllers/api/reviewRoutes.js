const router = require("express").Router();
const { withAuth, withAuthJson } = require("../../utils/auth");
const { Review, Podcast, User } = require("../../models");

// POST /api/review -- create one review
router.post("/", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    const reviews = reviewData.toJSON();
    
    res.json(reviews);
  } catch (err) {
    res.status(400).json({
      message: "Bad request",
    });
  }
});

// PUT /api/review/:id -- update one review

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
router.delete("/", withAuthJson, async (req, res) => {
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
