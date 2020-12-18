const Review = require("../models/Review");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");
const saltRounds = 10;

exports.createReview = async function (req, res, next) {
  let text = req.body.text;
  let score = req.body.score;
  let anonymousPost = req.body.anonymousPost;
  let reviewTitle = req.body.reviewTitle;
  let poster = req.body.poster;
  let name = req.body.name;
  let year = req.body.year;
  let type = req.body.type;
  let reviewer = req.body.reviewer;
  let imdbID = req.body.imdbID;
  let favourite = req.body.favourite;

  let user;
  if (req.user) {
    user = req.user._id;
  }

  let ano = false;

  await User.find({ '_id': user }, function (err, userinfo) {
    if (err) return handleError(err);
    if (userinfo.anonymous === true){
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
    type,
    reviewer,
    imdbID,
    favourite
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

exports.email = async (req, res) => {
  let oldemail = req.body.oldemail;
  let newemail = req.body.newemail;
  let confirmemail = req.body.confirmemail;

  try {
    let check = await User.findOne({ "email": oldemail, "_id": req.user._id });

    if (!check) throw "Wrong email";
    if (newemail != confirmemail) {
      throw "Emails do not match";
    }

    if (check.email == oldemail) {
      await User.findByIdAndUpdate(req.user._id, { email: newemail });
    }

    req.flash("success_msg", "Email was changed");
    res.redirect("back");
  } catch (err) {
    console.log(err);
    req.flash("error_msg", err);
    res.redirect("back");
  }
};

exports.password = async (req, res) => {
  let opassword = req.body.opassword;
  let npassword = req.body.npassword;
  let cpassword = req.body.cpassword;

  let user = await User.findOne({ "_id": req.user._id });

  try {
    let check = await bcrypt.compare(opassword, user.password);

    if (!check) throw "Wrong password";
    if (npassword != cpassword) {
      throw "Passwords do not match";
    }

    if (npassword.length < 8) {
      throw "Password must be at least 8 characters";
    }

    let hash = await bcrypt.hash(npassword, saltRounds);

    await User.findByIdAndUpdate(req.user._id, { password: hash });

    req.flash("success_msg", "Password was changed");
    res.redirect("back");
  } catch (err) {
    console.log(err);
    req.flash("error_msg", err);
    res.redirect("back");
  }
};
