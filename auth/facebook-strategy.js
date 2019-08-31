const passport = require('passport')
const Strategy = require('passport-facebook').Strategy;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

const userDb = [{ id: 1, facebookId: 2941435535872558, name: 'Node developer', email: 'xyz@mail.com' }];

export default () => {

    passport.serializeUser((user, done) => {
        console.log('passport.serializeUser', user.id, Date.now())
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        let user = userDb.find(user => user.facebookId == id);
        console.log('passport.deserializeUser', Date.now())
        done(null, user);
    });

    passport.use(new Strategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:8081/auth/facebook/callback"
    },
        (accessToken, refreshToken, profile, done) => {
            console.log("Strategy success", profile);
            return done(null, profile);
        }
    ));
}