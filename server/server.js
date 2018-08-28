const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {Word} = require('./models/word')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(bodyParser.json())

app.get('/entry/:tagId', async (req, res) => {
  resArray = []
  console.log(req.params.tagId)
  wordString = req.params.tagId
  let word = await search(req.params.tagId)
  console.log(resArray);
  res.send(resArray)
})

let resArray = []
let wordString = ''

// function should be moved to seperate file!
async function search (word) {
  console.log('functionStart' + word)
  // check full word
  let foundWord = await Word.find({'trad': word})
  // if result, add to result array
  if (foundWord.length > 0) {
    foundWord.forEach((word) => {
      resArray.push(word)
    })
    /* remove march from wordString and search again if still characters left */
    wordString = wordString.replace(resArray[resArray.length - 1].trad, '')
    if (wordString.length > 0) {
      await search(wordString)
    }
  } else {
    // check minus one character from end
    if (word.slice(0, -1).length > 0) {
      await search(word.slice(0, -1))
    }
  }
  /* start search from position 1 if no match */
  if (wordString.length > 1) {
    wordString = wordString.slice(1)
    await search(wordString)
  }
}

// app.use(function (req, res, next) {
//   res.status(404).send("Sorry can't find that!")
// })

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Started on port ${port}`)
  })
}
module.exports = {app}
