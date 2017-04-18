const http = require('http')
const https = require('https')

let toMoneyFormat = (number, currency) => {
  let money = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let currencyFormat = [['IDR', 'Rp.'], ['USD', '$']]

  let currenciesID;

  let formatted = currencyFormat.map((currencyID) => {
    if (currency === currencyID[0]) {
      currenciesID = currencyID[1]
    }
  })
  if (currenciesID == undefined) {
    return 'sorry'
  } else {
    return `${currenciesID} ${money}`
  }
}

let exchangeRate = (from, to) => {
  http.get(`http://api.fixer.io/latest?symbols=${from},${to}`, (response) => {
    var str = '';

    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      console.log(str);
    });
  }).end();

}

module.exports = {
  toMoneyFormat, exchangeRate
}
