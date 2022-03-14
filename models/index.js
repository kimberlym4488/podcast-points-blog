const User = require("./User");
const Podcast = require("./Podcast");
const Review = require("./Review");
// const Interest = require("./Interest");
//need to verify models with team

//User can have many reviews
User.hasMany(Review, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// User.hasMany(Interest, {
//   foreignKey: "user_id",
// });

// Reviews belong to a user
Review.belongsTo(User, {
  foreignKey: "user_id",
});

// A podcast can have many reviews
Podcast.hasMany(Review, {
  foreignKey: "podcast_id",
  onDelete: "CASCADE",
});

// // A podcast has interest
// Podcast.hasMany(Interest, {
//   foreignKey: "podcast_id",
// });

// Reviews belong to a podcast
Review.belongsTo(Podcast, {
  foreignKey: "podcast_id",
});

module.exports = { User, Podcast, Review };
