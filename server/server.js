const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// const { mongoose } = require("./db/mongoose");
// const { Word } = require("./models/word");
const { dic } = require("./array/dictToArray");

const app = express();
const port = process.env.PORT || 3000;

let maxLength = 0;
dic.array1.forEach(el => {
  if (el.trad.length > maxLength) {
    maxLength = el.trad.length;
  }
});
console.log(maxLength);

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(bodyParser.json());

app.get("/entry/:tagId", async (req, res) => {
  resArray = [];
  console.log(req.params.tagId);
  wordString = req.params.tagId;
  /*if all latin aplphabet then use english search*/
  if (
    /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g.test(wordString)
  ) {
    await searchEnlish(wordString);
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

function searchEnlish(text) {
  let foundWord = dic.array1.filter(el => el.en === text);
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

// // OLD VERSION
// async function search(word) {
//   console.log("functionStart" + word);
//   // check full word
//   let foundWord = await Word.find({ trad: word });
//   // if result, add to result array
//   if (foundWord.length > 0) {
//     foundWord.forEach(word => {
//       resArray.push(word);
//     });
//     /* remove march from wordString and search again if still characters left */
//     wordString = wordString.replace(resArray[resArray.length - 1].trad, "");
//     if (wordString.length > 0) {
//       await search(wordString);
//     }
//   } else {
//     // check minus one character from end
//     if (word.slice(0, -1).length > 0) {
//       await search(word.slice(0, -1));
//     }
//   }
//   /* start search from position 1 if no match */
//   if (wordString.length > 1) {
//     wordString = wordString.slice(1);
//     await search(wordString);
//   }
// }

// function should be moved to seperate file!

function search(word) {
  // check full word
  let foundWord = dic.array1.filter(
    el => el.trad === word.substr(0, maxLength)
  );

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

// app.use(function (req, res, next) {
//   res.status(404).send("Sorry can't find that!")
// })

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Started on port ${port}`);
  });
}
module.exports = { app };
