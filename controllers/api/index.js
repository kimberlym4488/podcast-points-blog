const router = require("express").Router();
const userRoutes = require("./userRoutes");
const reviewRoutes = require("./reviewRoutes");
// const podcastRoutes = require("./podcastRoutes")



//sets user login route to /api/user
router.use("/user", userRoutes);
router.use('/review', reviewRoutes)
// router.use('/podcast', podcastRoutes)
//router.use("/html", htmlRoutes);

module.exports = router;
