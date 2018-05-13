const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'spencer',
        password: '123',
        database: 'smart-brain'
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
app.get('/', (req, res) => {
    knex.select('*').from('users').then(data => {
        res.json(data)
    });
})
app.get('/profile/:id', profile.handleProfileGet(knex));

// POST ROUTES
app.post('/signin', signin.handleSignIn(knex, bcrypt));
app.post('/register', register.handleRegister(knex, bcrypt));
app.post('/imageurl', image.handleClarifaiApiCall());

// PUT ROUTES
app.put('/image', image.handleImagePut(knex));

// LISTEN
app.listen(3001, () => {
    console.log('app is running on 3001');
})
