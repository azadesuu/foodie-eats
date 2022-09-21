require("dotenv").config(); // for JWT password key

// used to create our local strategy for authenticating
// using username and password
const LocalStrategy = require("passport-local").Strategy;

// our user model
const User = require("../models/user");

// the following is required if you wanted to use passport-jwt
// JSON Web Tokens
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = function(passport) {
  // used by passport to store information in and retrieve data from sessions
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser((_id, done) => {
    passport.deserializeUser((_id, done) => {
      User.findById(_id)
        .then(user => {
          done(null, user);
        })
        .catch(done);
    });
  });

  // takes in username and password from login form
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        process.nextTick(function() {
          // see if the user with the email exists
          User.findOne({ email: email }, function(err, user) {
            // if there are errors, user is not found or password doesn't match
            if (err) return done(err);

            if (!user) return done(null, false);

            if (!user.validPassword(password)) {
              return done(null, false);
            }
            // otherwise, put the user's email in the session
            else {
              req.session.email = email;
              return done(null, user);
            }
          });
        });
      }
    )
  );

  // for signup
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        emailField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        process.nextTick(function() {
          User.findOne(
            {
              $or: [{ username: username }, { email: email }]
            },
            function(err, existingUser) {
              if (err) {
                console.log(err);
                return done(err);
              }
              // if password isn't strong or email is already taken, return
              // message describing the issue
              if (!password.match(strongPassword)) {
                return done(null, {
                  message: "Your password isn't strong enough."
                });
              }
              if (existingUser) {
                return done(null, {
                  message: "That username/email is already taken."
                });
              } else {
                // otherwise create a new user
                var newUser = new User();
                newUser.username = username;
                newUser.email = email;
                newUser.password = newUser.generateHash(password);

                // and save the user
                newUser.save(function(err) {
                  if (err) throw err;

                  return done(null, newUser);
                });
                req.session.email = email;
              }
            }
          );
        });
      }
    )
  );

  // to check that the client has a valid token
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.PASSPORT_KEY,
        passReqToCallback: true
      },
      (req, jwt_payload, done) => {
        // passport will put the decrypted token in jwt_payload variable
        User.findOne({ email: jwt_payload.body._id }, (err, user) => {
          if (err) {
            return done(err, false);
          }
          // if found, provide user instance to passport
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      }
    )
  );

  // passport middleware to handle User login
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async (email, password, done) => {
        try {
          // find the user associated with the email provided
          await User.findOne(
            {
              $or: [{ username: email }, { email: email }]
            },
            function(err, user) {
              // if user is not found or there are other errors
              if (err) return done(err);
              if (!user)
                return done(null, false, { message: "No user found." });
              // user is found but the password doesn't match
              if (!user.validPassword(password)) {
                return done(null, false, { message: "Oops! Wrong password." });
              }
              // otherwise, provide user instance to passport
              else {
                return done(null, user, { message: "Login successful" });
              }
            }
          ).clone();
        } catch (error) {
          console.log(error);

          return done(error);
        }
      }
    )
  );
};
