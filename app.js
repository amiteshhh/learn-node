let express = require('express');
let app = express();
let bodyParser = require('body-parser');

import { parsedCookiesMW, parsedQueryMW } from './middlewares';

import productRoutes from './routes/product.route';
import userRoutes from './routes/user.route';

app.use(bodyParser.json()) // for parsing application/json
app.use(parsedCookiesMW)
app.use(parsedQueryMW)

app.get('/', function (req, res) {
    res.redirect('/api/products');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
export default app;