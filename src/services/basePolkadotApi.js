import {
  web3Accounts,
  web3Enable,
  web3FromAddress
  //   web3FromAddress,
  //   web3ListRpcProviders,
  //   web3UseRpcProvider
} from '@polkadot/extension-dapp'

class BasePolkadotApi {
  constructor (polkadotApi) {
    this.polkadotApi = polkadotApi
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
