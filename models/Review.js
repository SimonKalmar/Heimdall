const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    reviewTitle: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
    },
    score: {
      type: Number,
      required: true
    },
    likes: [
      {
        type: String,
      },
    ],
    ano: {
      type: Boolean,
      required: true,
      default: false
    },
    reviewer: {
      type: String,
      required: true,
    },
    imdbID: {
      type: String,
      required: true
    },
    favourite: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
);

ReviewSchema.virtual("dateFormatted").get(function () {
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = this.createdAt;
  var d = date.getDate();
  var m = monthNames[date.getMonth()];
  var y = date.getFullYear();
  var h = ("0" + date.getHours()).slice(-2);
  var min = ("0" + date.getMinutes()).slice(-2);

  return d + " " + m + " " + y + " - " + h + ":" + min;
});

const Review = mongoose.model("Review", ReviewSchema, "review");

module.exports = Review;
