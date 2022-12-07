const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:process.env.OAUTH_CLIENT_ID,
        clientSecret:process.env.OAUTH_CLIENT_SECRET,
        callbackURL: process.env.OAUTH_CALLBACK_URL,
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));