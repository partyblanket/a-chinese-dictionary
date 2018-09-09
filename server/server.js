const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')

const { dic } = require("./array/dictToArray");

const app = express();

const port = process.env.PORT || 3000;

//CORS-enabled for all origin
app.use(cors())

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(bodyParser.json());

app.get("/entry/:tagId", async (req, res) => {
  resArray = [];
  console.log(req.params.tagId);
  wordString = req.params.tagId;
  /*if all latin aplphabet then use english search*/
  if (
    /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/i.test(wordString)
  ) {
    await searchEnglish(wordString);
  } else if (
    /^([0-9A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g.test(
      wordString
    )
  ) {
    await searchPinyin(wordString);
  } else {
    await search(wordString);
  }
  res.send(resArray);
});

let resArray = [];
let wordString = "";

function searchEnglish(text) {
  let toFind = new RegExp("(?<![:word:])" + text + "(?![:word:])", "i");
  let foundWord = dic.array1.filter(el => toFind.test(el.en));
  foundWord = foundWord.concat(dic.array2.filter(el => toFind.test(el.en)));
  foundWord = foundWord.concat(dic.array3.filter(el => toFind.test(el.en)));
  foundWord = foundWord.concat(dic.array4.filter(el => toFind.test(el.en)));
  foundWord = foundWord.concat(dic.array5.filter(el => toFind.test(el.en)));

  // if result, add to result array
  if (foundWord.length > 0) {
    foundWord.forEach(word => {
      resArray.push(word);
    });
  }
}

function searchPinyin(text) {
  text = text.split(/(?<=[0-9])(?!\s)(?!$)/g).join(" ");
  let foundWord = dic.array1.filter(el => el.cnpro === text);
  // if result, add to result array
  if (foundWord.length > 0) {
    foundWord.forEach(word => {
      resArray.push(word);
    });
  }
}

// function should be moved to seperate file!

function search(word) {
  // check full word
  let foundWord;
  if (word.length === 1) {
    foundWord = dic.array1.filter(el => el.trad === word);
  } else if (word.length === 2) {
    foundWord = dic.array2.filter(el => el.trad === word);
  } else if (word.length === 3) {
    foundWord = dic.array3.filter(el => el.trad === word);
  } else if (word.length === 4) {
    foundWord = dic.array4.filter(el => el.trad === word);
  } else {
    foundWord = dic.array1.filter(el => el.trad === word.substr(0, maxLength));
  }

  // if result, add to result array
  if (foundWord.length > 0) {
    foundWord.forEach(item => {
      resArray.push(item);
    });
    /* remove match from wordString and search again if still characters left */
    wordString = wordString.replace(resArray[resArray.length - 1].trad, "");
    if (wordString.length > 0) {
      search(wordString);
    }
  } else {
    // check minus one character from end
    if (word.slice(0, -1).length > 0) {
      search(word.substr(0, maxLength).slice(0, -1));
    }
  }
  /* start search from position 1 if no match */
  if (wordString.length > 1) {
    wordString = wordString.slice(1);
    search(wordString);
  }
}

// if module.parent then module run is probably run by test suite and server doesnt need to listen on port
if (!module.parent) {
  app.listen(port, () => {
    console.log(`Started on port ${port}`);
  });
}
module.exports = { app };
