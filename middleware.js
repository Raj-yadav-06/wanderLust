const listing = require("./models/listing.js");
const review = require("./models/review.js");
const {listingSchema , reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/expressError.js");
const mongoose = require("mongoose");

module.exports.isLoggedin = async(req,res,next) =>{

    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;

        req.flash("error" , "You have to login first to do further tasks");
       return res.redirect("/login");
    }
    next();
}


module.exports.saveredirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner = async(req,res,next) => {
    let {id} = req.params;
   let newListing =  await listing.findById(id);
   
   if(!newListing.owner.equals(res.locals.currUser._id)){
req.flash("error" , "you are not owner of this listing");
return res.redirect(`/listings/${id}`);
   }
next();
}

module.exports.validateListing = (req,res,next) =>{
  
   
      const {error} =  listingSchema.validate(req.body);

  if(error){
    next(new ExpressError(400 , error.message));
  }else{
    next();
  }
}

module.exports.validateReview = (req,res,next) => {
  const {error} =  reviewSchema.validate(req.body);
  if(error){
      

    next(new ExpressError(400 , error.message));

  }else{
    next();
  }
}

module.exports.isReviewAuthor = async(req,res,next) => {
    let {id , reviewid} = req.params;
    let Review =  await review.findById(reviewid);
   console.log(Review);
   if(!Review.author.equals(res.locals.currUser._id)){
req.flash("error" , "you are not owner of this review");
return res.redirect(`/listings/${id}`);
   }
next();
}

module.exports.validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ExpressError(400 , "page not found (wrong url)"));
  }
  
  next();
};