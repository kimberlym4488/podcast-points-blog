const router = require("express").Router();
const userRoutes = require("./userRoutes");
const reviewRoutes = require("./reviewRoutes");
const podcastRoutes = require("./podcastRoutes")

//sets user login route to /api/user
router.use("/user", userRoutes);
router.use("/review", reviewRoutes);
router.use('/podcast', podcastRoutes)

// router.get("/potm", async (req, res) => {
//     try {
//       const reviewData = await Review.findAll({
//         group: "podcast_id",
        
//         include: [
//           {
//             model: Podcast,
//             attributes: ["id", "name"],
//           },
//         ],
//         order: [["rating", "DESC"]],
//         limit: 1,
//       });

module.exports = router;
