'use strict';

const request = require('request-promise'); 

class CurrencyService {

  async currencyServ(currency){
    return await this.httpCall(`http://agile.cs.uh.edu/stock?ticker=${currency}`);
  }

  async httpCall(url){
    return request(url)  
      .then(response => response);
  }
}
module.exports = CurrencyService;