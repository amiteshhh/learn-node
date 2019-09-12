const express = require('express');
const session = require("express-session")
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport')

import { parsedCookies, parsedQuery, lastModifiedDate } from './middlewares';

import { productRoutes, userRoutes } from './routes';
import {
    customAuthRoute,
    checkCustomAuth,
    checkPassportAuth,
    setupLocalPassportStrategy,
    setupFacebookPassportStrategy,
    setupTwitterPassportStrategy,
    setupGooglePassportStrategy
} from './auth'

app.use(session({ secret: "my-secret-key" }));
app.use(bodyParser.json()) // for parsing application/json
app.use(parsedCookies)
app.use(parsedQuery)
app.use(passport.initialize())
app.use(passport.session())//validate subsequent route using session

//Use any one of below strategies
// setupLocalPassportStrategy();
// setupFacebookPassportStrategy();
// setupTwitterPassportStrategy();
// setupGooglePassportStrategy();


// #########  CUSTOM AUTH LOGIN
app.use('/auth/custom', customAuthRoute);

// ################## PASSPORT LOCAL AUTH LOGIN   ##################
app.get('/auth/local', passport.authenticate('local', { session: true }), (req, res) => {
    res.send(req.user);
});

// ################## PASSPORT FACEBOOK AUTH LOGIN   ##################

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook',
    passport.authenticate('facebook'));//it will work without this route as well
// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/api/products',
        failureRedirect: '/401'
    }));

// ################## PASSPORT TWITTER AUTH LOGIN   ##################

// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
app.get('/auth/twitter',
    passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/api/products',
        failureRedirect: '/401'
    }));


// ################## PASSPORT GOOGLE AUTH LOGIN   ##################

// Redirect the user to Google for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// Google will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/api/products',
        failureRedirect: '/401'
    }));


// ####### Application Routes
app.get('/', function (req, res) {
    res.redirect('/api/products');
});
app.use('/api/products',lastModifiedDate, productRoutes);//using passport
app.use('/api/users',lastModifiedDate, userRoutes);//using custom authentication
// app.use('/api/users', checkCustomAuth, userRoutes);//using custom authentication

// #########  UTILITY ROUTES
app.get('/401', (req, res) => {
    res.status(401).json({
        "code": 401,
        "message": 'Authorization failed.'
    });
})

export { app };