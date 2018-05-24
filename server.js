const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});
//Local Files
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

// Express initialization
const app = express();
app.use(bodyParser.json());
app.use(cors());

// GET ROUTES
app.get('/', (req, res) => { res.send('It is working!') });

app.get('/profile/:id', profile.handleProfileGet(knex));

// POST ROUTES
app.post('/signin', signin.handleSignIn(knex, bcrypt));
app.post('/register', register.handleRegister(knex, bcrypt));
app.post('/imageurl', image.handleClarifaiApiCall());

// PUT ROUTES
app.put('/image', image.handleImagePut(knex));

// LISTEN
const myPort = process.env.PORT ? process.env.PORT : 3001;
app.listen(myPort, () => {
    console.log(`app is running on ${myPort}`);
})