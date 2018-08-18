class UI {
  constructor () {
    this.trans = document.getElementById('trans')
  }

  showTrans (tran) {
    let toInsert = ''

    tran.word.forEach(word => {
      toInsert = toInsert.concat('<br>', `
      <div class = "">
        <div class = "row">
          <p>${word.en}</p>
        </div>
      </div>
      `)
    })

    this.trans.innerHTML = toInsert
  }
}
