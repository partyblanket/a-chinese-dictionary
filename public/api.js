class API {
  constructor() {


  }



  async getTran (char) {
    let apiUrl = 'https://rocky-sierra-24254.herokuapp.com/entry/'

    if (false) {
      apiUrl = 'http://localhost:3000/entry/'
    }
    //console.log(char);
    const charResponse = await fetch(`${apiUrl}${char}`)
//  const charResponse = await fetch(__dirname + '/entry/' + char)
    //console.log(charResponse)
    const tran = await charResponse.json()
    //console.log(tran)
    return {tran}
  }
}
