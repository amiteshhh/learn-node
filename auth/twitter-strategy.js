const passport = require('passport')
const Strategy = require('passport-twitter').Strategy;
const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

const userDb = [{ id: 1, twitterId: 2941435535872558, name: 'Node developer', email: 'xyz@mail.com' }];

export default () => {

    passport.serializeUser((user, done) => {
        console.log('passport.serializeUser', user.id, Date.now())
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        let user = userDb.find(user => user.twitterId == id);
        console.log('passport.deserializeUser', Date.now())
        done(null, user);
    });

    passport.use(new Strategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: "http://localhost:8081/auth/twitter/callback"
    },
        (token, tokenSecret, profile, done) => {
            console.log("StrategyHook called", profile);
            return done(null, profile);
        }
    ));
}