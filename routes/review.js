const express = require("express");
const router = express.Router({mergeParams:true});
const { isLoggedin, isOwner } = require("../middlewares.js");
const reviewController = require("../controller/review");

//add review route
router.post("/",isLoggedin, reviewController.addReview);


//delete review route
router.delete("/:reviewId",isLoggedin,isOwner, reviewController.deleteReview);

module.exports = router; 