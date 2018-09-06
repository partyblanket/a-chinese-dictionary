const fs = require("fs");
console.time("txt");

const dic = {
  array1: [],
  array2: [],
  array3: [],
  array4: [],
  array5: []
};

fs.readFileSync(__dirname + "/cedict_ts.u8")
  .toString()
  .split("\n")
  .forEach(line => {
    let chars = line.split(" ");
    let proArray = /(?<=\[)[\w\s:]+(?=\])/.exec(line) || ["none"];
    let defArray = /(?<=\/).+(?=\/)/.exec(line) || ["none"];
    let word = {
      simp: chars[1],
      trad: chars[0],
      en: defArray[0],
      cnpro: proArray[0]
    };
    if (word.trad.length === 1) {
      dic.array1.push(word);
    } else if (word.trad.length === 2) {
      dic.array2.push(word);
    } else if (word.trad.length === 3) {
      dic.array3.push(word);
    } else if (word.trad.length === 4) {
      dic.array4.push(word);
    } else {
      dic.array5.push(word);
    }
  });
console.log(dic.array1.length);

console.timeEnd("txt");

module.exports = { dic };
