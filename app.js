if(process.env.NODE_ENV != "production"){
require("dotenv").config();

}

// console.log(process.env);


const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash  = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const dbUrl = process.env.ATLAS_URL;

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret :   process.env.SECRET,
    },
    touchAfter : 24 * 3600,
}); 
store.on("error" , () => {
    console.log("ERROR in MONGO SESSION STORE" , err);
});

const sesssionOptions = {
        store,
        secret : process.env.SECRET,
        resave : false,
        saveUninitialized : true,
        cookie : {
            expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
            maxAge :  7 * 24 * 60 * 60 * 1000,
            httpOnly : true, 
        }
}


// routes
const listingsRoutes = require("./routes/listing.js");
const reviewsRoutes = require("./routes/review.js");
const userRoutes = require("./routes/user.js");
// files and utils
app.set("view engine" ,"ejs");
app.engine("ejs" , ejsMate);
const methodOverride = require("method-override");
app.set("views" , path.join(__dirname , "views"));

app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));






// connecting to db
main().then( () => {
    console.log("database connection succesfull");
}).catch((err) => {
console.log("failed to connect " + err);
})
async function main(){
    await mongoose.connect(dbUrl);
}


app.use(session(sesssionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
 

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



 
app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

app.use("/listings" , listingsRoutes);
app.use("/listings/:id/reviews" , reviewsRoutes);
app.use("/" , userRoutes);


app.all('/', (req, res, next) => {
  const err = new ExpressError(404,"page not found");
  next(err);
});


app.use((err,req,res,next) => {
  let {statusCode = 500 , message = "internal server error"} = err;
  res.status(statusCode).render("listings/error.ejs", { statusCode, message });
})


app.listen(port , () => {
    console.log("server is started at " + port);
})