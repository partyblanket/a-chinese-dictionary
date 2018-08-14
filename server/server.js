const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {Word} = require('./models/word')

const app = express()

app.use(bodyParser.json())

app.get('/entry', (req, res) => {
  console.log(req.body)
  Word.find(req.body).then(word => {
    res.send({word})
  }, e => {
    res.status(400).send(e)
  })
})



app.listen(3000, () => {
  console.log('Started on port 3000')
})

module.exports = {app}
