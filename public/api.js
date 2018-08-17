class API {
  constructor() {
  }

  async getTran (char) {
    const charResponse = await fetch('https://rocky-sierra-24254.herokuapp.com/entry', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET',
      body: {'trad': char}
    })

    const tran = await charResponse.json()

    return {tran}
  }
}
