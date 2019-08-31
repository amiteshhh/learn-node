const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const userDb = [{ id: 1, name: 'Node developer', email: 'xyz@mail.com' }];
const authDb = [{ id: 1, password: 1 }];

function getUserInfo(loginInfo) {
    let isUserValid = authDb.some(user => user.id === loginInfo.id && user.password === loginInfo.password);
    return isUserValid && userDb.find(user => user.id === loginInfo.id);
}

export const localStrategyHook = () => {
    passport.serializeUser(function (user, done) {
        console.log('passport.serializeUser', user.id)
        done(null, user.id);
    });
    
    passport.deserializeUser(function (id, done) {
        let user = userDb.find(user => user.id === id);
        console.log('passport.deserializeUser', user)
        done(null, user);
    });
    passport.use(new LocalStrategy({ usernameField: 'id', session: true }, (username, password, done) => {
        let userInfo = getUserInfo({ id: username, password: password });
        if (!userInfo) {
            return done(null, false, { message: 'Kindly verify user id or password and try again!!!' });
        }
        return done(null, userInfo);
    }));
}