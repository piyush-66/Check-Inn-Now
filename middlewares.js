const Listing = require("./models/listing");
module.exports.isLoggedin = (req,res,next)=>{
        req.session.redirectUrl = req.originalUrl;  
        if(!req.isAuthenticated())
        {
            req.flash("error","You must be logged-in.");
            return res.redirect("/login");
        }
        next();
};

module.exports.saveRedircTtUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if( res.locals.currUser && !(listing.owner._id.equals(res.locals.currUser._id)) )
    {
        req.flash("error","You are not the owner of this listing.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}