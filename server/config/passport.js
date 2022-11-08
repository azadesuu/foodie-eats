//require("dotenv").config(); // for JWT password key
const dotenv = require("dotenv").config();
// used to create our local strategy for authenticating
// using username and password
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// JSON Web Tokens
const passportJWT = require("passport-jwt");
const { exist } = require("joi");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// one lowercase and uppercase alphabet, one number
const strongPassword = new RegExp(
  "^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,}).{8,}$"
);
const validUsername = new RegExp(
  "^[a-zA-Z](_(?!(.|_))|.(?![_.])|[a-zA-Z0-9]){4,14}[a-zA-Z0-9]$"
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
          let emailEdit;
          email ? (emailEdit = email.toLowerCase().trim()) : undefined;
          const password = req.body.password;
          // see if the user with the email exists
          try {
            let existingUser = User.findOne({
              $or: [{ email: emailEdit }, { username: emailEdit }]
            });
            // if password isn't strong or email is already taken, return
            // message describing the issue
            if (!existingUser) {
              return done(null, false);
            }
            // if there are errors, user is not found or password doesn't match
            else if (!existingUser.validPassword(password)) {
              return done(null, false);
            }
            // otherwise, put the user's email in the session
            else {
              req.session.email = email;
              return done(null, existingUser);
            }
          } catch (err) {
            return done(err);
          }
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
          let usernameEdit;
          let emailEdit;
          req.body.username
            ? (usernameEdit = req.body.username.toLowerCase().trim())
            : undefined;
          req.body.email
            ? (emailEdit = req.body.email.toLowerCase().trim())
            : undefined;

          if (!usernameEdit || !emailEdit) {
            return done(null, false, {
              message: "Username/email not defined."
            });
          } else if (!strongPassword.test(password)) {
            return done(null, false, {
              message: "Your password isn't strong enough."
            });
          } else if (!validUsername.test(usernameEdit)) {
            return done(null, false, {
              message: "Your username isn't valid."
            });
          } else if (!validEmail.test(emailEdit)) {
            return done(null, false, {
              message: "Your email isn't valid."
            });
          } else {
            User.findOne(
              {
                $or: [{ email: emailEdit }, { username: usernameEdit }]
              },
              function(err, existingUser) {
                if (err) {
                  return done(null, false, err);
                }
                const username = usernameEdit;
                const email = emailEdit;
                const password = req.body.password;
                // if password isn't strong or email is already taken, return
                // message describing the issue
                if (existingUser) {
                  return done(null, false, {
                    message: "That username/email is already taken."
                  });
                } else {
                  // otherwise create a new user
                  // user+email is lowercased in database
                  try {
                    var newUser = new User();
                    newUser.username = username;
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password);

                    // and save the user
                    newUser.save(function(err, user) {
                      if (err) done(err);
                      return done(null, user);
                    });
                  } catch (err) {
                    return done(err);
                  }
                }
              }
            );
          }
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
        User.findOne({ _id: jwt_payload.body._id }, (err, user) => {
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
          let emailEdit;
          email ? (emailEdit = email.toLowerCase().trim()) : undefined;
          // find the user associated with the email provided
          let userLog = await User.findOne({
            $or: [{ username: emailEdit }, { email: emailEdit }]
          });
          // if user is not found or there are other errors
          if (!userLog)
            return done(null, false, {
              message: "No user was found with the given user/email"
            });
          // user is found but the password doesn't match
          else if (!userLog.validPassword(password)) {
            return done(null, false, { message: "Oops! Wrong password." });
          }
          // otherwise, provide user instance to passport
          else {
            return done(null, userLog);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
