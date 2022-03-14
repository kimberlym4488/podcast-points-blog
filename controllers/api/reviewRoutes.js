const router = require("express").Router();
const { withAuth, withAuthJson } = require("../../utils/auth");
const { Review, Podcast, User } = require("../../models");

// POST /api/review -- create one review
router.post("/", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findOne({
      where: {
        user_id: req.session.user_id,
        podcast_id: req.body.podcast_id,
      },
    });
    if (reviewData) {
      res.status(404).json({
        message: "This review has already been created.",
      });
      return;
    } else {
      const reviewNew = await Review.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      const reviews = reviewNew.toJSON();
      res.json(reviews);
      return;
    }
  } catch (err) {
    res.status(400).json({
      message: "Bad request",
    });
  }
});

router.put("/update/:podcast_id", withAuthJson, async (req, res) => {
  try {
    const findReview = await Review.findOne({
      where: {
        podcast_id: req.params.podcast_id,
        user_id: req.session.user_id,
      },
    });

    const reviewData = await Review.update(
      {
        rating: req.body.rating,
        review: req.body.review,
      },
      {
        where: {
          id: findReview.id,
        },
      }
    );

    // const reviews = reviewData.map((review) => review.toJSON());
    if (reviewData[0] === 1) {
      res.status(200).json(reviewData);
    } else {
      res.status(404).json({
        message: "Something went wrong",
      });
    }
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
        id: req.body.review_id,
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
