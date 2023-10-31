const passport = require('passport');
const Strategy = require('passport-local').Strategy;

passport.use('local.signup', new localStrategy({
    usernameField: 'username', 
    passportField: 'password',
    passReqCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
}));

//usando passport (middleware)
// serializar usuario 

// passport.serializeUser((usr, done) => {

// });

// Deserializar usuario