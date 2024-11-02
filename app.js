if(process.env.NODE_ENV != "production")
{
    require('dotenv').config();
}


 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride  = require("method-override");
const ejsMate = require("ejs-mate");  // ejs mate
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

const listing = require("./routes/listing.js");
const review = require("./routes/review.js");
const user = require("./routes/user.js");

const sessionOptions = {
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    Cookie:{         // ???
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};


const MongoURL = "mongodb://127.0.0.1:27017/CheckInnNow";
main()
.then(()=>{
    console.log("Connected to Database.");
})
.catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect(MongoURL);
}


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate); // 
app.use(express.static(path.join(__dirname,"/public"))); 






//home route
app.get("/",(req,res)=>{
    res.send("Hi, I am root!");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});
//


app.get("/demouser", async (req,res)=>{
    let fakeUser = new User({
        email: "student@gmail.com",
        username: "delta-student",
    });

    let registerUser = await User.register(fakeUser,"hello");
    res.send(registerUser);
});


app.use("/listings",listing);
app.use("/listings/:id/reviews",review); // id ***
app.use("/",user);  




app.listen(8080,()=>{
    console.log("server is listing to port 8080.")
});
