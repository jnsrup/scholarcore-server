const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: String,
  role: String,
  scholarship: String,
  rating: Number,
  review: String,
  location: String,
  date: String
});

module.exports = mongoose.model("Review", reviewSchema);