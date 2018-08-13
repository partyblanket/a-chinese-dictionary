//Imports CC dict into database
const {Word} = require('./../server/models/word')
const fs = require('fs')
const {MongoClient} = require('mongodb')

let docArray = []

fs.readFileSync(__dirname + '/cedict_ts.u8').toString().split('\n').forEach((line) => {
  if (line[0] === '#') {return}
  let chars = line.split(' ')
  let proArray = /(?<=\[)[\w\s:]+(?=\])/.exec(line) || ['none']
  let defArray = /(?<=\/).+(?=\/)/.exec(line) || ['none']
  let word = new Word({
    simp: chars[1],
    trad: chars[0],
    en: defArray[0],
    cnpro: proArray[0]
  })
  docArray.push(word)
})

MongoClient.connect('mongodb://localhost:27017/dict', (err, client) => {
  if (err) {
    return console.log('Unable to connect to Mongodb server')
  }
  console.log('Connected to Mongodb server')
  client.db('dict').collection('dict').insertMany(docArray).then((res, err) => {
    console.log(res.result)
  }).catch(err => console.log(err))

  // client.close() - need to change to async to get it to close
})
