const api = new API
const ui = new UI
// Search input
const searchChar = document.getElementById('searchChar')

// Search input event listener
searchChar.addEventListener('keyup', (e) => {
  const userText = e.target.value.trim()
  if (e.keyCode === 13 && userText !== '') {
    console.log(userText)
    api.getTran(userText).then(data => {
      if (data.tran.length === 0) {
        console.log('not found')
      } else {
        ui.showTrans(data.tran)
      }
    })
  }
})
