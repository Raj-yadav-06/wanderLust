const listing = require("../models/listing.js");
const review = require("../models/review.js");



module.exports.reviewCreated = async (req , res , next) => {
  let {id} = req.params;
  let list =  await listing.findById(id);
// console.log(req.body.review);
  let newReview = new review(req.body.review);
  newReview.author = req.user._id;
 await newReview.save();

   list.reviews.push(newReview._id);
 await list.save();
 req.flash("success" , "review added");
 res.redirect(`/listings/${list.id}`);
}

module.exports.reviewDestroy = async (req,res) => {
  let {id,reviewid} = req.params;
  await listing.findByIdAndUpdate(id , {$pull : {reviews : reviewid}});
  await review.findByIdAndDelete(reviewid);
   req.flash("success" , "Deleted review");

  res.redirect(`/listings/${id}`);
}