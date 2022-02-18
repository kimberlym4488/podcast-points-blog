const sequelize = require("../config/connection");
const { User, Podcast, Review } = require("../models");

const reviewData = require("./reviewSeeds.json");
const userData = require("./userSeeds.json");
const podcastData = require("./podcastSeeds.json");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Podcast.bulkCreate(podcastData);
  await Review.bulkCreate(reviewData);

  process.exit(0);
};

seedAll();
