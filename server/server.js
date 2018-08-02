const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
mongoose.connect(process.env.MONGODB_URI);

app.get('/', (req, res) => res.send('Server on'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser())

app.use(session({
  secret: process.env.jwtSecret,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
 }));
app.use(passport.initialize());
app.use(passport.session());
// Passport Serialize
passport.serializeUser(function(user, done){
  done(null, user._id);
});
// Passport Deserialize

passport.deserializeUser(function(id, done) {
  Models.User.findById(id, function(err, user) {
    done(err, user);
  });
});
// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', apiRoutes);
//routes


app.use('/auth', authRoutes);


app.listen(8080, () => console.log('Example app listening on port 8080!'))
