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
    console.log('BasePolkadotApi Created')
  }

  async setSigner (signerAddress) {
    // Enable web3 plugin
    await web3Enable(process.env.APP_NAME)
    // Get injector to call a Extrinsic
    const injector = await web3FromAddress(signerAddress)
    // Set signer
    this.polkadotApi.api.setSigner(injector.signer)
  }

  async requestUsers () {
    // returns an array of all the injected sources
    // (this needs to be called first, before other requests)
    await web3Enable(process.env.APP_NAME)
    // returns an array of { address, meta: { name, source } }
    // meta.source contains the name of the extension that provides this account
    const allAccounts = await web3Accounts()
    return allAccounts
  }

  getAccountInfo (address) {
    return this.polkadotApi.api.derive.accounts.info(address)
  }
}

export default BasePolkadotApi
