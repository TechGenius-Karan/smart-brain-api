const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host: 'dpg-ci61ku98g3n4q9v8bqu0-a.singapore-postgres.render.com',
    port: 5432,
    database: 'postgres',
    user: 'smart_brain_backend_3sm4_user',
    password: '0OJfNoFN4jSRY6feaZIWBGd3tEvA3HD9',
    ssl: {
      rejectUnauthorized: false
    }
  }
});


db.select('*').from('users').then(data => {
	//console.log(data);
});


const app = express();
app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res) => {
	res.send('<h1>Success!!</h1>');
})

            //Signin component//

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })


            //Register Component//

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
  

            //Profile Component//

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db,) })


            //Image Component//
      
app.put('/image', (req, res) => { image.handleImage(req, res, db,) })

            //Security Feature//

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res,) })



app.listen(1234, () => {
	console.log('app is running on port 1234')
})

