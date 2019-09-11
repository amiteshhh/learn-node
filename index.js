import { app } from './app';
const models = require('./models')
const port = process.env.PORT || 8081;
// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(function () {
    app.listen(port, () => console.log(`App listening on port ​${port}​!`))
});
