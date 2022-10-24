//require("dotenv").config(); // for JWT password key
const dotenv = require('dotenv').config()
// used to create our local strategy for authenticating
// using username and password
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// JSON Web Tokens
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// one lowercase and uppercase alphabet, one number
const strongPassword = new RegExp(
  "^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,}).{8,}$"
);
const validUsername = new RegExp(
  "^[a-zA-Z](_(?!(.|_))|.(?![_.])|[a-zA-Z0-9]){5,18}[a-zA-Z0-9]$"
);
const validEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

module.exports = function(passport) {
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
          User.findOne(
            {
              $or: [
                { username: email.toLowerCase() },
                { email: email.toLowerCase() }
              ]
            },
            function(err, user) {
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
            }
          );
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
              $or: [{ username: req.body.username }, { email: req.body.email }]
            },
            function(err, existingUser) {
              const username = req.body.username;
              const email = req.body.email;
              if (err) {
                return done(err);
              }
              // if password isn't strong or email is already taken, return
              // message describing the issue
              if (existingUser) {
                return done(null, {
                  message: "That username/email is already taken."
                });
              } else if (!username || !email) {
                return done(null, {
                  message: "Username/email not defined."
                });
              } else if (!strongPassword.test(password)) {
                return done(null, {
                  message: "Your password isn't strong enough."
                });
              } else if (!validUsername.test(username)) {
                return done(null, {
                  message: "Your username isn't valid."
                });
              } else if (!validEmail.test(email)) {
                return done(null, {
                  message: "Your email isn't valid."
                });
              } else {
                // otherwise create a new user
                // user+email is lowercased in database
                var newUser = new User();
                newUser.username = req.body.username;
                newUser.email = req.body.email;
                newUser.password = newUser.generateHash(password);

                // and save the user
                newUser.save(function(err) {
                  if (err) throw err;

                  return done(null, newUser);
                });
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
              $or: [
                { username: email.toLowerCase() },
                { email: email.toLowerCase() }
              ]
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
          return done(error);
        }
      }
    )
  );
};
