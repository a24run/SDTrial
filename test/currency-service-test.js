'use strict';

const expect = require('chai').expect;
require('chai').use(require('chai-as-promised'));
const ServiceChecker = require('../src/CurrencyService');
const sinon = require('sinon');

describe('Canary Test', function(){

  it('Canary test ', ()=>{
    expect(true).to.be.eql(true);
  });
});


describe('Service Test', function(){
  let serviceChecker;
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    serviceChecker = new ServiceChecker();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('Check if currency returned is not undefined', () =>{

    return expect(serviceChecker.currencyServ('GOOG')).to.eventually.not.eql(undefined);
  });

  it('Check Network Failure', () =>{
    const serviceChecker = new ServiceChecker();
    sandbox.stub(serviceChecker, 'httpCall')
      .throws(new Error('network failure'));

    return expect(serviceChecker.currencyServ('GOOG')).to.eventually.rejectedWith('network failure');
  });
});