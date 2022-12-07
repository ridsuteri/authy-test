const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');

require('dotenv').config();
require('./config/passport');

const routes = require('./routes/index');
const port = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());
app.use('/api', routes);

app.get('/', (req, res) => res.json({ message: 'Hello World, Welcome to authy test api, please use /api/auth/google to login using google' }));

app.listen(port, () => console.log(`Server started at port : ${port}`));