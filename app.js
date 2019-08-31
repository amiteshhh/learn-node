const express = require('express');
const session = require("express-session")
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport')

import { localStrategyHook } from './passport-helper';
import { parsedCookies, parsedQuery, validateAuthToken, validatePassportSession } from './middlewares';

import { productRoutes, userRoutes, authRoute } from './routes';

app.use(session({ secret: "my-secret-key" }));
app.use(bodyParser.json()) // for parsing application/json
app.use(parsedCookies)
app.use(parsedQuery)
app.use(passport.initialize())
app.use(passport.session())//validate subsequent route using session
localStrategyHook();


// app.use('/auth', authRoute);//custom authentication login route
// passport authentication
app.use('/auth', passport.authenticate('local', { session: true }), (req, res) => {
    res.send(req.user);
});

app.get('/', function (req, res) {
    res.redirect('/api/products');
});

app.use('/api/products', validatePassportSession, productRoutes);//using passport
app.use('/api/users', validateAuthToken, userRoutes);//using custom authentication
export { app };