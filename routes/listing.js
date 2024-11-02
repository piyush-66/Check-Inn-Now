const express = require("express");
const router = express.Router();
const { isLoggedin,isOwner } = require("../middlewares.js");
const listingController = require("../controller/listing.js");
const multer  = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//index route for all listings //post listing(Create route)
router.route("/")
.get(listingController.index)
.post(isLoggedin, upload.single('listing[image]'), listingController.postListing);


//new listing(New Route)
router.get("/new",isLoggedin, listingController.newListing);


//show route and update and delet 
router.route("/:id")
.get( listingController.showListing)
.put(isLoggedin,isOwner, listingController.updateListing)
.delete(isLoggedin,isOwner, listingController.deleteListing);


//edit route
router.get("/:id/edit",isLoggedin,isOwner, listingController.editListing);



module.exports = router;