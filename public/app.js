const api = new API
const ui = new UI
// Search input
const searchChar = document.getElementById('searchChar')
const toneMarkBtn = document.getElementById('myonoffswitch3')
const tradSimpBtn = document.getElementById('myonoffswitch4')

let currentSearch = ''

// Search input event listener
searchChar.addEventListener('keyup', (e) => {
  const userText = e.target.value.trim()
  if (e.keyCode === 13 && userText !== '') {
    searchApi(userText)
  }
})

toneMarkBtn.addEventListener('click', () => {
  if (currentSearch !== '') {
    searchApi(currentSearch)
  }
})


tradSimpBtn.addEventListener('click', () => {
  if (currentSearch !== '') {
    searchApi(currentSearch)
  }
})

function searchApi (userText) {
  console.log(userText)
  api.getTran(userText).then(data => {
    if (data.tran.length === 0) {
      console.log('not found')
    } else {
      ui.showTrans(data.tran)
      currentSearch = userText
    }
  })
}
