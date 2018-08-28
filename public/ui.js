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
      toInsert = toInsert.concat('', `
      <br>
        <div class="row">
          <div class="col-1">
            <p>${word.trad}</p>
          </div>
          <div class="col-2">
            <p>${word.cnpro}</p>
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
