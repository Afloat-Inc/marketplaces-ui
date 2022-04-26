import {
  web3Accounts,
  web3Enable
//   web3FromAddress,
//   web3ListRpcProviders,
//   web3UseRpcProvider
} from '@polkadot/extension-dapp'
const { ApiPromise, WsProvider } = require('@polkadot/api')

class PolkadotApi {
  constructor ({ wss }) {
    this.wss = wss
    console.log('PolkadotApi', this.wss)
  }

  async connect () {
    // Initialise the provider to connect to the local node
    const provider = new WsProvider(this.wss)

    // Create the API and wait until ready
    const api = await ApiPromise.create({ provider })

    // Retrieve the chain & node information information via rpc calls
    const [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version()
    ])

    return {
      chain,
      nodeName,
      nodeVersion
    }
  }

  async requestUsers () {
    // returns an array of all the injected sources
    // (this needs to be called first, before other requests)
    const allInjected = await web3Enable('my custom template app')
    console.log('allInjected', allInjected)
    // returns an array of { address, meta: { name, source } }
    // meta.source contains the name of the extension that provides this account
    const allAccounts = await web3Accounts()
    return allAccounts
  }
}

export default PolkadotApi
