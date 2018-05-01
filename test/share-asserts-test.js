'use strict';

const expect = require('chai').expect;
require('chai').use(require('chai-as-promised'));
const ServiceChecker = require('../src/CurrencyService');
const ShareAsserts = require('../src/shareAsserts');
const sinon = require('sinon');

describe(' Check Asset value of individual Share ', () =>{
  let shareAsserts;
  let serviceChecker;
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    serviceChecker = new ServiceChecker();
    shareAsserts = new ShareAsserts(serviceChecker);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('user has 1 shares of worth 100 asset value should be 100' , function () {
    sandbox.stub(serviceChecker, 'currencyServ')
      .returns(Promise.resolve(100));                                                      
    
    return expect(shareAsserts.individualSharePrice('GOOG', 1)).to.eventually.eql(100);
  });

  it('user has 4 shares of worth 88.5 asset value should be 354' , function () {                                                          
  	sandbox.stub(serviceChecker, 'currencyServ')
      .returns(Promise.resolve(88.5));
    
    return expect(shareAsserts.individualSharePrice('GOOG', 4)).to.eventually.eql(354);
  });
})

describe(' Check Asset value of All Share ', () =>{
  let shareAsserts;
  let serviceChecker;
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    serviceChecker = new ServiceChecker();
    shareAsserts = new ShareAsserts(serviceChecker);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('user has 1 share of worth 100 and 2 shares of worth 100, total asset value should be 300' , function () {
    sandbox.stub(serviceChecker, 'currencyServ')
      .returns(Promise.resolve(100));                                                      
    
    return expect(shareAsserts.assetValue([['GOOG', '1'],['RANDOM', '2']])).to.eventually.eql(300);
  });

})