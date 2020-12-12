const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const idx = require("../controllers/indexController");
const Ajax = require("../models/Ajax");
const upload = require("../config/multer");
const apiCon = require("../controllers/apiController");


router.get('/', forwardAuthenticated, idx.frontpage);



router.get('/dashboard', ensureAuthenticated, idx.dashboard);

router.get('/test', idx.test);

router.get('/search', idx.search);

router.get('/movie/:id', idx.moviepage);

router.get('/settings', ensureAuthenticated, idx.settings);

router.post('/profilepic', ensureAuthenticated, upload, apiCon.profilePic);

router.post('/reviewsend', ensureAuthenticated, apiCon.createReview);


module.exports = router;
