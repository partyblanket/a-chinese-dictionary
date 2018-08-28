class API {
  constructor() {


  }

  async getTran (char) {
    let apiUrl = 'https://rocky-sierra-24254.herokuapp.com/entry/'
    if (false) {
      apiUrl = 'http://localhost:3000/entry/'
    }
    const charResponse = await fetch(`${apiUrl}${char}`)
    const tran = await charResponse.json()
    return {tran}
  }
}
