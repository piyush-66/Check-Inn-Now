const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:String,
    description:String,
    image:{
        url:String,
        filename:String
    },
    price:Number,
    location:String,
    country:String,
    reviews : [
        {
            type:Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner : {
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});


listingSchema.post("findByIdAndDelete", async(listing)=>{
    if(listing)
    {
        await Review.deleteMany({listing_id : {$in : listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports  = Listing;