//Imports CC dict into database
const {Word} = require('./../server/models/word')

app.post('/todos', (req,res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((body)=>{
    res.send(body)
  },(e) => {
    res.status(400).send(e);
  })


var word = new Word({
  simp: 'simpentry',
  trad:'tradentry',
  en: 'enentry',
  cnpro: 'proentry'
});

word.save();
