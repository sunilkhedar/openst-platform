"use strict";

/**
 * Generate new address
 *
 * @module services/utils/generate_address
 */

const rootPrefix = '../..'
  , responseHelper = require(rootPrefix + '/lib/formatter/response')
  , basicHelper = require(rootPrefix + '/helpers/basic_helper')
  , InstanceComposer = require( rootPrefix + "/instance_composer")
;

require(rootPrefix + '/lib/web3/providers/factory');

/**
 * Constructor to generate a new address
 *
 * @param {object} params
 * @param {string} params.chain - Chain on which this new address should be generated and stored
 * @param {string} [params.passphrase] - Passphrase for the new address. Default: blank
 *
 * @constructor
 */
const GenerateAddressKlass = function (params) {
  const oThis = this
  ;

  params = params || {};
  oThis.passphrase = params.passphrase || '';
  oThis.chain = params.chain;
};

GenerateAddressKlass.prototype = {
  /**
   * Perform<br><br>
   *
   * @return {promise<result>}
   */
  perform: async function () {
    const oThis = this
      , web3ProviderFactory = oThis.ic().getWeb3ProviderFactory()
    ;

    const web3Provider = web3ProviderFactory.getProvider(oThis.chain, web3ProviderFactory.typeWS);
    if (!web3Provider) {
      let errObj = responseHelper.error({
        internal_error_identifier: 's_u_ga_1',
        api_error_identifier: 'invalid_chain',
        error_config: basicHelper.fetchErrorConfig()
      });
      return Promise.resolve(errObj);
    }

    var eth_address = await web3Provider.eth.personal.newAccount(oThis.passphrase);

    // returns a promise which resolves to an address which was created.
    return Promise.resolve(responseHelper.successWithData({address: eth_address}));
  }

};

InstanceComposer.registerShadowableClass(GenerateAddressKlass, "getGenerateAddressService");

module.exports = GenerateAddressKlass;