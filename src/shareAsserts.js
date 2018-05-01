'use strict';

class ShareAssets{

  constructor(currencyService) {
    this.currencyService = currencyService;
  }

  async individualSharePrice(share , numberOfShares){
    return this.currencyService.currencyServ(share)
      .then(value => value * numberOfShares);
  }

  async assetValue(allShares){
   let sum = 0; 
   for(let index = 0; index < allShares.length ; index ++){
      sum  = sum + await this.individualSharePrice(allShares[index][0] , allShares[index][1] );
   }
   return sum;
  }
}

module.exports = ShareAssets;