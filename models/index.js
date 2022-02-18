const User = require("./User");
const Podcast = require("./Podcast");
const Review = require("./Review");

//need to verify models with team

//User can have many reviews
User.hasMany(Review, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Reviews belong to a user
Review.belongsTo(User, {
  foreignKey: "user_id",
});

// A podcast can have many reviews
Podcast.hasMany(Review, {
  foreignKey: "podcast_id",
  onDelete: "CASCADE",
});

// Reviews belong to a podcast
Review.belongsTo(Podcast, {
  foreignKey: "podcast_id",
});

module.exports = { User, Podcast, Review };
