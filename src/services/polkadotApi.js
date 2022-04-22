import {
  web3Accounts,
  web3Enable
//   web3FromAddress,
//   web3ListRpcProviders,
//   web3UseRpcProvider
} from '@polkadot/extension-dapp'
const { ApiPromise, WsProvider } = require('@polkadot/api')

class PolkadotApi {
  async connect () {
    // Initialise the provider to connect to the local node
    const provider = new WsProvider('wss://n1.hashed.systems')

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
    console.log('allAccounts', allAccounts)
    return allAccounts
  }
}

export default PolkadotApi
