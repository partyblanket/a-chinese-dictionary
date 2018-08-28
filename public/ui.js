const pinyinConverter = new PinyinConverter

class UI {
  constructor () {
    this.trans = document.getElementById('trans')
  }

  showTrans (tran) {
    let toInsert = `
    <div class="container">
      <div class="row">
        <div class="col-1">
          <p>Trad</p>
        </div>
        <div class="col-2">
          <p>Pronounciation</p>
        </div>

        <div class="col-3">
          <p>English</p>
        </div>
      </div>
      `

    tran.forEach(word => {
      console.log(word)
      let pro = pinyinConverter.convert(word.cnpro)
      toInsert = toInsert.concat('', `
      <br>
        <div class="row">
          <div class="col-1">
            <p>${word.trad}</p>
          </div>
          <div class="col-2">
            <p>${pro}</p>
          </div>

          <div class="col-3">
            <p>${word.en}</p>
          </div>
        </div>
      `)
    })
    toInsert = toInsert.concat('', `
      </div>
    `)

    this.trans.innerHTML = toInsert
  }
  //
  // parsePro (orig) {
  //
  // }
}


console.log(pinyinConverter.convert('ni3 hao3'))
