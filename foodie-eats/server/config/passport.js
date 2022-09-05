require('dotenv').config()    // for JWT password key

// used to create our local strategy for authenticating
// using username and password
const LocalStrategy = require('passport-local').Strategy;

// our user model
const User = require('../models/user');

// the following is required if you wanted to use passport-jwt
// JSON Web Tokens
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = function(passport) {

    // these two functions are used by passport to store information
    // in and retrieve data from sessions. We are using user's object id
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(_id, done) {
        User.findById(_id, function(err, user) {
            done(err, user);
        });
    });


    // strategy to login
    // this method only takes in username and password, and the field names
    // should match of those in the login form
    passport.use('local-login', new LocalStrategy({
            usernameField : 'username', 
            passwordField : 'password',
            passReqToCallback : true}, // pass the req as the first arg to the callback for verification 
        function(req, username, password, done) {
            
            // you can read more about the nextTick() function here: 
            // https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
            // we are using it because without it the User.findOne does not work,
            // so it's part of the 'syntax'
            process.nextTick(function() {
                // see if the user with the email exists
                User.findOne({ 'username' :  username }, function(err, user) {
                    // if there are errors, user is not found or password
                    // does match, send back errors
                    if (err)
                        return done(err);
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No user found.'));

                    if (!user.validPassword(password)){
                        // false in done() indicates to the strategy that authentication has
                        // failed
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }
                    // otherwise, we put the user's email in the session
                    else {
                        // in app.js, we have indicated that we will be using sessions
                        // the server uses the included modules to create and manage
                        // sessions. each client gets assigned a unique identifier and the
                        // server uses that identifier to identify different clients
                        // all this is handled by the session middleware that we are using 
                        req.session.username = username; // for demonstration of using express-session
                        
                        // done() is used by the strategy to set the authentication status with
                        // details of the user who was authenticated
                        return done(null, user, req.flash('loginMessage', 'Login successful'));
                    }
                });
            });

        }));



    // for signup
    passport.use('local-signup', new LocalStrategy({
            usernameField : 'username',
            emailField: 'email',
            passwordField : 'password',
            passReqToCallback : true }, // pass the req as the first arg to the callback for verification 
            
         function(req, username, password, done) {             
            process.nextTick( function() {
                User.findOne({'username': username}, function(err, existingUser) {
                    // search a user by the username (email in our case)
                    // if user is not found or exists, exit with false indicating
                    // authentication failure
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    if (existingUser) {
                        console.log("existing");
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    }
                    else {
                        // otherwise
                        // create a new user
                        var newUser = new User();
                        newUser.username = username;
                        newUser.email = req.body.email;
                        newUser.password = newUser.generateHash(password);

                

                        // and save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            return done(null, newUser);
                        });

                        // put the user's email in the session so that it can now be used for all
                        // communications between the client (browser) and the FoodBuddy app
                        req.session.username = username;

                    }

                });
            });

        }));

    // depending on what data you store in your token, setup a strategy
    // to verify that the token is valid. This strategy is used to check
    // that the client has a valid token
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // clien puts token in request header
        secretOrKey   : process.env.PASSPORT_KEY, // the key that was used to sign the token
        passReqToCallback: true
    }, (req, jwt_payload, done) => { // passport will but the decrypted token in jwt_payload variable

        // here I'm simply searching for a user with the email addr
        // that was added to the token. _id was added to the token
        // body that was signed earlier in the userRouter.js file
        // when logging in the user
        console.log(jwt_payload.body._id)
        User.findOne({'username':jwt_payload.body._id}, (err, user) => {

            if(err){
                return done(err, false);
            }
            // if we found user, provide the user instance to passport    
            if(user){
                return done(null, user);
            } else { // otherwise assign false to indicate that authentication failed
                return done(null, false);
            }
        });
    }));

    //Create a passport middleware to handle User login
    // EXERCISE: Write the signup strategy

   // passport middleware to handle User login
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          // find the user associated with the email provided
          await User.findOne({ username: username }, function (err, user) {
            // if user is not found or there are other errors
            if (err) return done(err);
            if (!user) return done(null, false, { message: "No user found." });
            // user is found but the password doesn't match
            if (!user.validPassword(password)) {
              return done(null, false, { message: "Oops! Wrong password." });
            }
            // otherwise, provide user instance to passport
            else {
              return done(null, user, { message: "Login successful" });
            }
          });
        } catch (error) {
          return done(error);
        }
      }
    )
  );


};



