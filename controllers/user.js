const listing = require("../models/listing.js");
const review = require("../models/review.js");
const User = require("../models/user.js");

module.exports.signUpForm =  async(req, res) => {
    res.render("./user/signUp.ejs");
}

module.exports.signUp = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let user = new User({
            email: email,
            username: username,
        })
        await User.register(user, password);
        req.login(user , (err) => {
            if(err){
                return next(err);
            }
req.flash("success", "Welcome to WanderLust !");
        res.redirect("/listings");
        })
        
    } catch (e) {
        console.log(e.message);
        req.flash("error", e.message);
        res.redirect("/signUp");
    }
}


module.exports.loginForm = async (req, res) => {

    res.render("./user/login.ejs");

}


module.exports.login = async (req, res) => {

req.flash("success" , "Welcome back to Wanderlust !");
let redirectUrl = res.locals.redirectUrl || "/listings";

res.redirect(redirectUrl);
  
}

module.exports.logout = async (req,res,next) => {
    req.logout((err) => {
        if(err){
        next(err);
        }
         req.flash("success" , "you successfully logged out");
    res.redirect("/listings");
    })
   
}