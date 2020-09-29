const express = require('express')
var bodyParser = require('body-parser')
var consign = require('consign')
const authMiddleware = require('./middlewares/auth')
var cors = require('cors');

const app = express()
const port = 3000


app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
 
app.use(bodyParser.json()) // parse application/json

app.use(cors()); // habilitar cors para o vue

consign()
  .then('controllers')
  .into(app);

app.post('/auth/login', app.controllers.AuthController.login);
app.post('/auth/register', app.controllers.AuthController.register);

app.use('/auth/profile', authMiddleware);
app.get('/auth/profile', app.controllers.AuthController.getAuthProfile);

app.use('/users', authMiddleware);
app.get('/users/list', app.controllers.AuthController.userList);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
