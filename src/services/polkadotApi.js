import {
  web3Accounts,
  web3Enable
//   web3FromAddress,
//   web3ListRpcProviders,
//   web3UseRpcProvider
} from '@polkadot/extension-dapp'
import { ApiPromise, WsProvider } from '@polkadot/api'

class PolkadotApi {
  constructor ({ wss }) {
    this.wss = wss
    this.api = undefined
    console.log('PolkadotApi', this.wss)
  }

  async connect () {
    try {
      // Initialise the provider to connect to the local node
      const provider = new WsProvider(this.wss)

      // Create the API and wait until ready
      const api = new ApiPromise({ provider })
      this.api = api
      // const api = await ApiPromise.create({ provider })

      // console.log('apiPromise', api)

      await new Promise((resolve, reject) => {
        let failedCount = 0
        api.on('connected', v => {
          console.warn('Event detected connected', v)
        })
        api.on('disconnected', v => {
          console.warn('Event detected disconnected', v)
        })
        api.on('error', v => {
          console.warn('Event detected error', failedCount, v)
          if (failedCount <= 10) {
            failedCount++
          } else {
            reject(`An error ocurred trying to connect at ${this.wss}`)
          }
        })
        api.on('ready', async (v) => {
          console.warn('Event detected ready', v)
          resolve()
        })
      })
      // console.warn('status', status)

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
    } catch (e) {
      console.error('connect polkadot Api', e)
      throw new Error(e)
    }
  }

  async requestUsers () {
    // returns an array of all the injected sources
    // (this needs to be called first, before other requests)
    const allInjected = await web3Enable(process.env.APP_NAME)
    console.log('allInjected', allInjected)
    // returns an array of { address, meta: { name, source } }
    // meta.source contains the name of the extension that provides this account
    const allAccounts = await web3Accounts()
    return allAccounts
  }
}

export default PolkadotApi
