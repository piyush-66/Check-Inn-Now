const User = require("../models/user");
//signup
module.exports.signupUser = async (req,res)=>{
    res.render("users/signup.ejs");
};

//signup Post
module.exports.signupPostUser = async(req,res)=>{

    

    let {username,email,password} = req.body;
    const newUser = new User({email,username});
    const registerUser =  await User.register(newUser,password);
    console.log(registerUser);
    req.login(registerUser,(err)=>{
        if(err){
            next(err);
        }
        else
        {
            req.flash("success","Welcome to CheckInnNow.");
            res.redirect("/listings");
        }
    });
};

//login
module.exports.loginUser = async (req,res)=>{
    res.render("users/login.ejs");
};

//login post
module.exports.loginPostUser = async(req,res)=>{
    req.flash("success","Welcome back to CheckInnNow. You are logged in.");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

//logout
module.exports.logoutUser = (req,res,next)=>{
    req.logout((err)=>{
        if(err)
        {
            next(err);
        }
        else{
            req.flash("success","You are logged out.");
            res.redirect("/listings");
        }
    });
};