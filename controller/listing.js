const Listing = require("../models/listing");

//index route for all listings
module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings}); 
};

//new listing(New Route)
module.exports.newListing = async (req,res)=>{ 
    res.render("listings/new.ejs");
};

//post listing(Create route)
module.exports.postListing = async (req,res)=>{

    let url = req.file.path;
    let filename = req.file.filename;
    
    const newListing = new Listing(req.body.listing) 
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success","New listing Created!");
    res.redirect("/listings");
}

//show route
module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: { path: "author" }
    })
    .populate("owner");
    console.log(listing);

    res.render("listings/show.ejs",{listing});
};

//edit route  
module.exports.editListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);

    res.render("listings/edit.ejs",{listing});
};

//update route
module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(id,{...req.body.listing}); 
        req.flash("success","Listing Updated!");
        res.redirect(`/listings/${id}`);
};

//delete route 
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};