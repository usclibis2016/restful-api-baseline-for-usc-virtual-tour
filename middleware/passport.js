
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/Librarian");
const SECRET  = "my_secret_key";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};

module.exports = passport => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      await User.findOne({"_id":payload.user_id})
        .then(user => {
          if (user) {
            return done(null,user);
          }
          return done(null, false);
        })
        .catch(err => {
          return done(null, false);
        });
    })
  );
};