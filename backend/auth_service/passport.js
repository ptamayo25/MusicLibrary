const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy; //breadcrumb

//Medium Article walkthrough on passport.js used for reference
//https://medium.com/nerd-for-tech/google-oauth2-0-authentication-using-node-js-and-passportjs-1a77f42b1111

//Serialize and Deserialize user
passport.serializeUser(function (user, done) {
  done(null, user);
});

//Deserialize user
passport.deserializeUser(function (user, done) {
  done(null, user);
});

//Use Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4001/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
