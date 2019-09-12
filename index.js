import { app } from './app';
const mongoose = require('mongoose')
const port = process.env.PORT || 8081;

mongoose.connect('mongodb+srv://app1DbUser:H9pBcal0AG77QwG2@cluster0-cre0c.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => {
    app.listen(port, () => console.log(`App listening on port ​${port}​!`))
}).catch((error) => {
    console.log(error);
})

