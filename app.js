const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;
const user = require("./user");
const iphone = require("./api/iphone");
const passport = require("passport")

const port = process.env.PORT || 8080;

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// npm i cookie-parser body-parser express-session connect-ensure-login --save
const Strategy = require("passport-facebook").Strategy

passport.use(new Strategy({
        clientID: "1073895849730583",
        clientSecret: "7010e375fe43d88512b9f946a059ad77",
        callbackURL: "/user/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, next) {
        //console.log(profile)
        // var user = {
        //     "name": profile.name.familyName + " " + profile.name.givenName,
        //     "id": profile.id,
        //     "token": accessToken
        // }
        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //     return next(err, user);
        //   });
      

        return next(null, profile)
    })
)

passport.serializeUser(function (user, next) {
    next(null, user)
})

passport.deserializeUser(function (obj, next) {
    next(null, obj)
})

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
app.use("/user", user);
app.use("/api/iphone", iphone);


app.listen(port, () => {
    console.log("Server is running on " + port)
});

app.get("/", (req, res) => {
    res.send("Üdv az almaboltban");
})

app.get("/helloworld", (req, res) => {
    res.send("Hello World");
});

