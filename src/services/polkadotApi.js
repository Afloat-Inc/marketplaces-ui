import {
  web3Accounts,
  web3Enable,
  web3FromAddress
//   web3FromAddress,
//   web3ListRpcProviders,
//   web3UseRpcProvider
} from '@polkadot/extension-dapp'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { decodeAddress, encodeAddress } from '@polkadot/keyring'
import { stringToU8a, isHex, hexToU8a } from '@polkadot/util'

class PolkadotApi {
  constructor (wss) {
    this.wss = wss || process.env.WSS
    this.api = undefined
  }

  /**
   * @description Connect to WSS server and get api
   * @returns {Object}
   * { chain, nodeName, nodeVersion }
   */
  async connect () {
    try {
      // Initialize the provider to connect to the local node
      const provider = new WsProvider(this.wss)

      // Create the API and wait until ready
      const api = new ApiPromise({ provider })
      this.api = api
      console.log('api', api)
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

      // console.log('api', api)

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

  /**
   * TODO sign message
   */
  async login ({ address }) {
    // returns an array of all the injected sources
    // (this needs to be called first, before other requests)
    await web3Enable(process.env.APP_NAME)
    // returns an array of { address, meta: { name, source } }
    // meta.source contains the name of the extension that provides this account
    const injector = await web3FromAddress(address)
    const message = stringToU8a('this is a test')
    this.api.sign(address, { signer: injector.signer })
    // this.api.query
    // this.api.setSigner(injector.signer)
    // injector.signer.signRaw(message)
    // this.api.sign(undefined, address, { signer: injector.signer })
    console.log('login user', injector, message, this.api)
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

  isValidPolkadotAddress (address) {
    try {
      encodeAddress(
        isHex(address)
          ? hexToU8a(address)
          : decodeAddress(address)
      )
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * @name getAccountInfo
   * @description Get user details info
   * @param {*} user User address
   * @returns { Object }
   * { identity }
   */
  getAccountInfo (user) {
    return this.api.derive.accounts.info(user)
  }
}

export default PolkadotApi
