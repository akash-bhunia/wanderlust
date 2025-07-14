const express = require("express");
const router = express.Router({mergeParams:true});

const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const {isLoggedIn,reviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//Reviews route post
router.post("/",isLoggedIn, wrapAsync(reviewController.createReview));


//delete reviews route
router.delete("/:reviewId",isLoggedIn,reviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;