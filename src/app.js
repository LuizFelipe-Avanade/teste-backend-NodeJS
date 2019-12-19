const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

const signUpRoute = require('./routes/signUpRoute')
const signInRoute = require('./routes/signInRoute')
const listUserRoute = require('./routes/listUserRoute')
const authUser = require('./routes/authRouter')

mongoose.connect('mongodb+srv://luizFelipe:admin@clusterdev-0-fxsgi.azure.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())
app.use(cors())

app.use('/signup', signUpRoute)
app.use('/signin', signInRoute)
app.use('/user/', authUser.authenticate, listUserRoute)

app.use(function (req, res, next) {
  res.status(404).send({ mensagem: 'mensagem de erro' })
})

module.exports = app
