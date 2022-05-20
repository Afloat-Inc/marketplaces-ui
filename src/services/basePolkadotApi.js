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
   * @description Call a TX from polkadot api for a specific pallet and handler response subscription
   * @param {String} extrinsicName Extrinsic function name to call
   * @param {String} signer User address to sign transaction
   * @param {*} params Params for extrinsic function
   * @returns tx response from polkadot api
   */
  async callTx (extrinsicName, signer, params) {
    await this.setWeb3Signer(signer)
    console.log('callTx params', params)
    let unsub
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        if (params) {
          unsub = await this.polkadotApi.api.tx[this.palletName][extrinsicName](...params).signAndSend(signer, (e) => this.handlerTXResponse(e, resolve, reject, unsub))
        } else {
          unsub = await this.polkadotApi.api.tx[this.palletName][extrinsicName]().signAndSend(signer, (e) => this.handlerTXResponse(e, resolve, reject, unsub))
        }
      } catch (e) {
        reject(e)
      }
    })
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
   * @name exMultiQuery
   * @description Execute a query or query subscription from polkadot api
   * @param {String} queryName Query name to execute
   * @param {Array} params Params for query execution, Params [Array]
   * @param {*} subTrigger Function handler to query subscription
   * @returns Query response or unsubscribe function from polkadot api
   */
  async exMultiQuery (queryName, params, subTrigger) {
    return this.polkadotApi.api.query[this.palletName][queryName].multi(params, subTrigger)
  }

  /**
   * @name handlerTXResponse
   * @description Function to resolve a promise evaluating Extrinsic state event
   * @param {*} e Event from transaction subscription
   * @param {*} resolve Resolve Function
   * @param {*} reject Reject Function
   * @param {*} unsub Unsubscribe Function
   */
  async handlerTXResponse (e, resolve, reject, unsub) {
    const { events = [], status } = e
    console.log('events', events)
    console.log('status', status)
    if (status.isFinalized || status.isInBlock) {
      // console.log(`Transaction included at blockHash ${status.asFinalized}`)

      // Loop through Vec<EventRecord> to display all events
      events.forEach(({ phase, event: { data, method, section } }) => {
        console.log(`\t' ${phase}: ${section}.${method}:: ${data}`)
      })

      events.filter(({ event: { section } }) => section === 'system').forEach(({ event: { method, data } }) => {
        if (method === 'ExtrinsicFailed') {
          // txFailedCb(result);
          console.log('ExtrinsicFailed', data)
          const [dispatchError] = data
          let errorInfo

          console.log('ExtrinsicFailed error', data)
          // decode the error
          if (dispatchError.isModule) {
            const decoded = data.registry.findMetaError(dispatchError.asModule)
            errorInfo = `${decoded.section}.${decoded.name}`
          } else {
            // Other, CannotLookup, BadOrigin, no extra info
            errorInfo = dispatchError.toString()
          }

          // console.error('errorInfo', errorInfo)
          console.log('unsub', unsub)
          unsub()
          reject(`Extrinsic failed: ${errorInfo}`)
          // const mod = data[0].asModule
        } else if (method === 'ExtrinsicSuccess') {
          console.log('ExtrinsicSuccess', data)
          console.log('unsub', unsub)
          unsub()
          resolve(data)
          // txSuccessCb(result);
        }
      })
    }
  }

  /**
   * @name requestUsers
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
   * @name getAccountInfo
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
