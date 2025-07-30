const express = require("express");
const listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router({mergeParams : true});
const review = require("../models/review.js");
const {isLoggedin,validateReview ,isReviewAuthor} = require("../middleware.js");
const reviewControllers = require("../controllers/review.js");


router.post("/" , isLoggedin ,validateReview, wrapAsync(reviewControllers.reviewCreated));

router.delete("/:reviewid" , isLoggedin , isReviewAuthor ,wrapAsync(reviewControllers.reviewDestroy));

module.exports = router;