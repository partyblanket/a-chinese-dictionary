const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {Word} = require('./models/word')


const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.get('/entry', (req, res) => {
  console.log(req.body)
  Word.find(req.body).then(word => {
    res.send({word})
  }, e => {
    res.status(400).send(e)
  })
})


if (!module.parent) {
  app.listen(port, () => {
    console.log(`Started on port ${port}`)
  })
}
module.exports = {app}
