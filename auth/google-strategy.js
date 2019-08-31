const passport = require('passport')
const Strategy = require('passport-google-oauth').OAuth2Strategy;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const userDb = [{ id: 1, googleId: 100524209107612711288, name: 'Node developer', email: 'xyz@mail.com' }];

export default () => {

    passport.serializeUser((user, done) => {
        console.log('passport.serializeUser', user.id, Date.now())
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        let user = userDb.find(user => user.googleId == id);
        console.log('passport.deserializeUser', user.googleId, Date.now())
        done(null, user);
    });

    passport.use(new Strategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: "http://localhost:8081/auth/google/callback"
    },
        (token, tokenSecret, profile, done) => {
            console.log("StrategyHook called")
            return done(null, profile);
        }
    ));
}