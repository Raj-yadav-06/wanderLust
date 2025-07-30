const express = require("express");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
// const {listingSchema} = require("../schema.js");
const router = express.Router();
const {saveredirectUrl} = require("../middleware.js");
const userControllers = require("../controllers/user.js");


router.route("/signup")
.get(wrapAsync(userControllers.signUpForm))
.post(wrapAsync(userControllers.signUp));

router.route("/login")
.get(wrapAsync(userControllers.loginForm))
.post(saveredirectUrl ,passport.authenticate("local", 
{ failureRedirect: "/login", failureFlash: true }), 
wrapAsync(userControllers.login));



router.get("/logout" , wrapAsync(userControllers.logout));



module.exports = router;