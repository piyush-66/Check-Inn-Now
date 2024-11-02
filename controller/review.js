const Listing = require("../models/listing");
const Review = require("../models/review");


//add 
module.exports.addReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id); 
    let newReview = new Review(req.body.review);
    
    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();

    console.log("review is saved sunccessfully.");
    
    req.flash("success","Review Created!");
    res.redirect(`/listings/${listing._id}`);
};

//delete 
module.exports.deleteReview = async(req,res)=>{
    let {id,reviewId}= req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
};
