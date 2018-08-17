const api = new API

// Search input
const searchChar = document.getElementById('searchChar')

// Search input event listener
searchChar.addEventListener('keyup', (e) => {
  const userText = e.target.value
  if (userText !== '') {
    console.log(userText)
    api.getTran(userText).then(data => {
      console.log(data);
    })
  }
})
