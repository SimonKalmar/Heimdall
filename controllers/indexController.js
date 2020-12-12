const Ajax = require("../models/Ajax");

const mongoose = require('mongoose');
const request = require('request');
const User = require('../models/User');
const Review = require('../models/Review');

exports.frontpage = function (req, res) {
    res.render('index', {
        title: 'Heimdall',
        subtitle: 'Inspired by Traversy'
    });
};

exports.dashboard = function (req, res) {
    res.render('dashboard', {
        title: 'Heimdall',
        subtitle: 'Here\'s What We Do:',
        user: req.user
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
    'url': 'http://www.omdbapi.com/?s=' + nameCleaned + '&page=1&apikey=9471e0e1',
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
    res.render('index', {
        title: movieRes.Title + " (" + movieRes.Year + ")",
        subtitle: 'Here\'s What We Do:',
        user: req.user,
        response: movieRes,
    });
  });
};

exports.settings = (req, res) => {
  res.render("settings", {
    title: "Settings",
    user: req.user,
  });
};
