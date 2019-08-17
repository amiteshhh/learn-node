const express = require('express');
const app = express();
const bodyParser = require('body-parser');

import { parsedCookies, parsedQuery } from './middlewares';

import { productRoutes, userRoutes } from './routes';

app.use(bodyParser.json()) // for parsing application/json
app.use(parsedCookies)
app.use(parsedQuery)

app.get('/', function (req, res) {
    res.redirect('/api/products');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
export { app };