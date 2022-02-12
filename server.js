const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
//this is helping store the cookies in the database. This table will have the cookie data. This is it! 
const SequelizeStore = require('connect-session-sequelize')(session.Store)
//make sure to set this up. Great starting server file for homeworks/projects, a lot of our needs for our boilerplate server. 

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions with cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Stored in milliseconds (86400 === 1 day) How long the cookie lives for. (3600 - 1 hour)
    maxAge: 86400,//rolling number (new request) refreshes the window. Actively interacting with the site starts the time over. 
    httpOnly: true,
    secure:true, //(make sure cookie only sent over secure https connections)
    sameSite:'strict',
  },

  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
