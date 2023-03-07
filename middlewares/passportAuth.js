
const User = require("../models/userModel");
const passport =  require('passport');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    
const jwtOptions = {
    // Authorization: Bearer in request headers
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    }
passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.userId}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }else {
            return done(null, false);
        }
    });
}));

