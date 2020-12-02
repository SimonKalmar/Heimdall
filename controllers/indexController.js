const Ajax = require("../models/Ajax");

const mongoose = require('mongoose');
const request = require('request');

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
  /* let info = "the+avengers";
  let requestedData = Object.create(Ajax);
  const getData = function(requestedData, info) {
    requestedData.init();
    requestedData.getFile("http://www.omdbapi.com/?t=" + info + "&apikey=9471e0e1", showData);

    let showData = function(e) {
      let datas = JSON.parse(e.target.responseText);
      console.log(datas);
*/

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


/*    };
  };

  getData(); */
};
