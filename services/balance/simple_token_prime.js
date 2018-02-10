"use strict";

/**
 * Get simple token prime Balance of an address
 *
 * @module services/balance/simple_token_prime
 */

const rootPrefix = '../..'
  , fundManager = require(rootPrefix + '/lib/fund_manager')
  , responseHelper = require(rootPrefix + '/lib/formatter/response')
  , basicHelper = require(rootPrefix + '/helpers/basic_helper')
;

/**
 * simple token prime balance
 *
 * @param {object} params -
 * @param {string} params.address - Account address
 *
 * @constructor
 */
const SimpleTokenPrimeBalanceKlass = function(params) {
  const oThis = this;

  params = params || {};
  oThis.address = params.address;
};

SimpleTokenPrimeBalanceKlass.prototype = {

  perform: function () {
    const oThis = this;

    try {
      //Validations
      if (!basicHelper.isAddressValid(oThis.address)) {
        return Promise.resolve(responseHelper.error('s_b_st_1', 'Invalid address'));
      }

      return fundManager.getSTPrimeBalanceOf(oThis.address);
    } catch (err) {
      return Promise.resolve(responseHelper.error('s_b_st_2', 'Something went wrong. ' + err.message));
    }

  }

};

module.exports = SimpleTokenPrimeBalanceKlass;