const Ajax = require("../models/Ajax");

const mongoose = require('mongoose');
const request = require('request');
const User = require('../models/User');
const Review = require('../models/Review');

exports.frontpage = async function (req, res, next) {
  let latestReviews = await Review.find()
    .sort([["createdAt", -1]])
    .populate()
    .limit(10);

  let users = await User.find()
    .populate()

  res.render('index', {
      title: 'Heimdall',
      subtitle: 'Here\'s What We Do:',
      user: req.user,
      latestReviews: latestReviews,
      users: users
  });
};

exports.dashboard = async function (req, res, next) {
  let latestReviews = await Review.find()
    .sort([["createdAt", -1]])
    .populate()
    .limit(10);

  let users = await User.find()
    .populate()

  res.render('dashboard', {
      title: 'Heimdall',
      subtitle: 'Here\'s What We Do:',
      user: req.user,
      latestReviews: latestReviews,
      users: users
  });
};

exports.test = async function (req, res, next) {
  var name = await req.query.mname;
  var nameCleaned = name.replace(/\s/g, '+');
  var options = {
    'method': 'GET',
    'url': 'http://www.omdbapi.com/?t=' + nameCleaned + '&apikey=9471e0e1',
    'headers': {
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    let movieRes = JSON.parse(response.body);
    res.render('index', {
        title: movieRes.Title + " (" + movieRes.Year + ")",
        subtitle: 'Here\'s What We Do:',
        user: req.user,
        response: movieRes,
    });
  });

};

exports.search = async function (req, res, next) {
  var name = await req.query.ask;
  var nameCleaned = name.replace(/\s/g, '+');
  var options = {
    'method': 'GET',
    'url': 'http://www.omdbapi.com/?s=' + nameCleaned + '&type=movie&page=1&apikey=9471e0e1',
    'headers': {
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    let searchRes = JSON.parse(response.body);
    res.render('search.pug', {
        title: "Search",
        subtitle: 'Here\'s What We Do:',
        user: req.user,
        search: searchRes,
    });
  });
};

exports.moviepage = async function (req, res, next) {
  var name = await req.params.id;

  let latestReviews = await Review.find({ 'imdbID': name })
    .sort([["createdAt", -1]])
    .populate()
    .limit(10);

  let users = await User.find()
    .populate()

  let scoreSum = 0;
  let reviewFound = 0;
  const len = latestReviews.length;
  let review = null;
  for (let i = 0; i < len; i++) {
    review = latestReviews[i];
    if (review.score) {
        scoreSum = review.score + scoreSum;
        reviewFound = reviewFound + 1;
    }
  }
  const averageScore = scoreSum / reviewFound;
  console.log("Average score:", averageScore);

  var options = {
    'method': 'GET',
    'url': 'http://www.omdbapi.com/?i=' + name + '&apikey=9471e0e1',
    'headers': {
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    let movieRes = JSON.parse(response.body);

    res.render('reviewpage', {
        title: movieRes.Title + " (" + movieRes.Year + ")",
        subtitle: 'Here\'s What We Do:',
        user: req.user,
        response: movieRes,
        latestReviews: latestReviews,
        average: averageScore,
        users: users
    });
  });
};

exports.allreviews = async function (req, res, next) {
  let latestReviews = await Review.find()
    .sort([["createdAt", -1]])
    .populate()

  let users = await User.find()
    .populate()
  res.render('allreviews', {
      title: 'All Reviews',
      subtitle: 'Here\'s What We Do:',
      user: req.user,
      latestReviews: latestReviews,
      users: users
    });
};

exports.allreviewsmovie = async function (req, res, next) {
  var name = await req.params.id;
  let latestReviews = await Review.find({ 'imdbID': name })
    .sort([["createdAt", -1]])
    .populate()

  let users = await User.find()
    .populate()
  res.render('allreviews', {
      title: 'All Reviews',
      subtitle: 'Here\'s What We Do:',
      user: req.user,
      latestReviews: latestReviews,
      users: users
    });
};

exports.settings = async (req, res) => {
  let latestReviews = await Review.find()
    .sort([["createdAt", -1]])
    .populate()

  let users = await User.find()
    .populate()

  res.render("settings", {
    title: "Settings",
    user: req.user,
    reviews: latestReviews,
    users: users
  });
};
