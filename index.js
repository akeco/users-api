const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const routes = require('./src/routes');
const PORT = 4000;
require('dotenv').config();

mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`, { useNewUrlParser : true, useUnifiedTopology: true })
.then(() => console.log('DB Connected!'))
.catch(err => {
    console.log(err);
});

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(helmet());

routes(app);

app.listen(PORT, () => {
    console.log("Server listen on port " + PORT);
});
