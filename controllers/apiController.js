const Review = require("../models/Review");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");
const saltRounds = 10;

exports.createReview = async function (req, res, next) {
  let { text, score, anonymousPost, reviewTitle, poster, name, year, type } = await req.param;

  let user;
  if (req.user) {
    user = req.user._id;
  }

  let ano = false;

  await User.find({ 'user': user }, function (err, anonymous) {
    if (err) return handleError(err);
    if (anonymous){
      return ano = true;
    } else if (anonymousPost === "true") {
      return ano = true;
    }
  });

  let numberedScore = parseInt(score, 10);
  // Create new review object
  const newReview = new Review({
    user,
    text,
    score,
    ano,
    reviewTitle,
    poster,
    name,
    year,
    type
  });
    //Save Review if mongoose Validation succeeds
  newReview
    .save()
    .then(() => {
      req.flash("success_msg", "Review was created");
      res.redirect("back");
    })
    .catch((err) => {
      console.log(err);
      req.flash("error_msg", "Something went wrong");
      res.redirect("back");
    });


};


exports.profilePic = async (req, res) => {
  console.log("Hellooo");
  try {
    let img = await cloudinary.upload(req);

    let image = img.public_id;

    await User.findByIdAndUpdate(req.user._id, { image: image });

    req.flash("success_msg", "Profile picture was changed");
    res.redirect("back");
  } catch (err) {
    console.log(err);
    req.flash("error_msg", "Something went wrong");
    res.redirect("back");
  }
};
