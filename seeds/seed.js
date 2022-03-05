const sequelize = require("../config/connection");
const { User, Podcast, Review, Interest } = require("../models");

const reviewData = require("./reviewSeeds.json");
const userData = require("./userSeeds.json");
const podcastData = require("./podcastSeeds.json");
const interestData = require("./interestData.json");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Podcast.bulkCreate(podcastData);
  await Review.bulkCreate(reviewData);
  await Interest.bulkCreate(interestData);

  process.exit(0);
};

seedAll();
