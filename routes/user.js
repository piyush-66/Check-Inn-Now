const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedircTtUrl } = require("../middlewares.js");
const userController = require("../controller/user.js");
const user = require("../models/user.js");

router.route("/signup")
.get(userController.signupUser)
.post( userController.signupPostUser);


router.route("/login")
.get( userController.loginUser)
.post( 
    saveRedircTtUrl,
    passport.authenticate(
        "local",
        { failureRedirect:"/login",
          failureFlash:true,
    }),
    userController.loginPostUser);

router.get("/logout",userController.logoutUser);

module.exports = router;