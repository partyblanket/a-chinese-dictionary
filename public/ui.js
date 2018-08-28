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
          <p>中文</p>
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
      let pro = word.cnpro
      if (toneMarkBtn.checked === true) {
        pro = pinyinConverter.convert(word.cnpro)
      }
      let char = word.simp
      if (tradSimpBtn.checked === true) {
        char = word.trad
      }
      toInsert = toInsert.concat('', `
      <br>
        <div class="row">
          <div class="col-1">
            <p>${char}</p>
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
}

console.log(pinyinConverter.convert('ni3 hao3'))
