const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {Word} = require('./models/word')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(bodyParser.json())

app.get('/entry/:tagId', (req, res) => {
  console.log(req.params.tagId)
  Word.find({'trad': req.params.tagId}).then(word => {
    res.send({word})
  }, e => {
    res.status(400).send(e)
  })
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Started on port ${port}`)
  })
}
module.exports = {app}
