const express = require('express');
const app = express();
const auth = require('./routes/auth');
const api = require('./routes/api');
const passport = require('passport');

app.get('/', (req, res) => res.send('Server on'))

//routes


app.use('/auth', auth(passport));


app.listen(8080, () => console.log('Example app listening on port 8080!'))
