import {
  web3Accounts,
  web3Enable,
  web3FromAddress
  //   web3ListRpcProviders,
  //   web3UseRpcProvider
} from '@polkadot/extension-dapp'

class BasePolkadotApi {
  /**
   * Class constructor
   * @param {PolkadotApi} polkadotApi Instance from PolkadotApi class
   * @param {String} palletName Pallet Name
   */
  constructor (polkadotApi, palletName) {
    this.polkadotApi = polkadotApi
    this.palletName = palletName
  }

  /**
   * @name setSigner
   * @description Set signer from web3FromAddress using web 3 plugin
   * @param {String} user User address
   */
  async setWeb3Signer (user) {
    // Enable web3 plugin
    await web3Enable(process.env.APP_NAME)
    // Get injector to call a Extrinsic
    const injector = await web3FromAddress(user)
    // Set signer
    this.polkadotApi.api.setSigner(injector.signer)
  }

  /**
   * @name callTx
   * @description Call a TX from polkadot api for a specific pallet
   * @param {String} extrinsicName Extrinsic function name to call
   * @param {String} signer User address to sign transaction
   * @param {*} params Params for extrinsic function
   * @returns tx response from polkadot api
   */
  async callTx (extrinsicName, signer, params) {
    await this.setWeb3Signer(signer)
    if (params) {
      return this.polkadotApi.api.tx[this.palletName][extrinsicName](params).signAndSend(signer)
    }
    return this.polkadotApi.api.tx[this.palletName][extrinsicName]().signAndSend(signer)
  }

  /**
   * @name exQuery
   * @description Execute a query or query subscription from polkadot api
   * @param {String} queryName Query name to execute
   * @param {*} params Params for query execution
   * @param {*} subTrigger Function handler to query subscription
   * @returns Query response or unsubscribe function from polkadot api
   */
  async exQuery (queryName, params, subTrigger) {
    return this.polkadotApi.api.query[this.palletName][queryName](params, subTrigger)
  }

  /**
   * @description Return available accounts from web3Accounts
   * @returns {Array}
   * [{ address, meta: { genesisHash, name, source }, type }]
   */
  async requestUsers () {
    // (this needs to be called first, before other requests)
    await web3Enable(process.env.APP_NAME)
    // meta.source contains the name of the extension that provides this account
    const allAccounts = await web3Accounts()
    return allAccounts
  }

  /**
   * @description Get user details info
   * @param {*} user User address
   * @returns { Object }
   * { identity }
   */
  getAccountInfo (user) {
    return this.polkadotApi.api.derive.accounts.info(user)
  }
}

export default BasePolkadotApi
