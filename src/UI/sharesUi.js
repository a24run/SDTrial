'use strict';

const readline = require('readline');
const fs = require('fs-extra');
const ServiceChecker = require('../CurrencyService');
const ShareAsserts = require('../shareAsserts');

const readLine = readline.createInterface({ 
  input: process.stdin,
  output: process.stdout
});

async function readFile() {
  try {
    return await fs.readFile('shares.txt', 'utf-8');

  } catch (error) {
    console.log(error);
  }
}

async function printAsRequired(){
  try {
    const serviceChecker = new ServiceChecker();
    const sharesAsset = new ShareAsserts(new ServiceChecker);
    const text = await readFile();
    
    const allSharesAndQuantity = text.split('\n');
    let sharesAndQuantityArray=[];
    for (let index = 0; index < allSharesAndQuantity.length ; index ++){
      if(allSharesAndQuantity[index] != '')
        sharesAndQuantityArray.push(allSharesAndQuantity[index].split(' '));
    }
    for( let index =0; index < sharesAndQuantityArray.length; index ++){
      console.log(sharesAndQuantityArray[index][0] , sharesAndQuantityArray[index][1] ,await  serviceChecker.currencyServ(sharesAndQuantityArray[index][0]) , 
        await sharesAsset.individualSharePrice(sharesAndQuantityArray[index][0] , sharesAndQuantityArray[index][1]) )
    }
    console.log('Asset Value of all shares is ',await sharesAsset.assetValue(sharesAndQuantityArray));
    readLine.close();
  }
  catch(error){
    console.log(error);
  }

}

printAsRequired();