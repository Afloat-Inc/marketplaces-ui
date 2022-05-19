import BasePolkadotApi from '~/services/basePolkadotApi'

class NbvStorageApi extends BasePolkadotApi {
  constructor (polkadotApi) {
    super(polkadotApi)
    this.polkadotApi = polkadotApi
    console.log('NbvStorageApi created')
  }

  /**
   * @name getXpubByUser
   * @description Get Xpub by user
   * @param {String} user User address
   * @returns {Object}
   * { id, xpub }
   */
  getXpubByUser (user) {
    return this.polkadotApi.api.query.nbvStorage.xpubsByOwner(user)
  }

  /**
   * @name getXpubByUser
   * @description Get Xpub by user
   * @param {String} id Xpub id
   * @returns {Object}
   * { id, xpub }
   */
  getXpubById (id) {
    return this.polkadotApi.api.query.nbvStorage.xpubs(id)
  }

  async getXpubByUserSubscription (user, trigger) {
    const sub = await this.polkadotApi.api.query.nbvStorage.xpubsByOwner(user, e => {
      if (trigger) {
        console.warn('triggered subscription', e)
        trigger(e)
      }
    })
    return sub
  }

  /**
   * @name getVaultsByUser
   * @description Get all vaults where user is owner or cosigner
   * @param {String} user User address
   * @returns {Array} list vaults array
   * [{ id, name }]
   */
  getVaultsByUser (user) {
    return this.polkadotApi.api.derive.nbvStorage.vaults(user)
  }

  /**
   * @name submitXPUB
   * @description Set XPUB for a user
   * @param {String} user user address
   * @returns undefined
   */
  async submitXPUB ({ user, XPUB }) {
    // Enable web3 plugin and set Signer
    await this.setWeb3Signer(user)
    // Call Extrinsic
    return this.polkadotApi.api.tx.nbvStorage.setXpub(XPUB).signAndSend(user)
  }

  /**
   * @name submitXPUB
   * @description Set XPUB for a user
   * @param {String} user user address
   * @returns undefined
   */
  async removeXpub ({ user }) {
    // Enable web3 plugin and set Signer
    await this.setWeb3Signer(user)
    console.log('removeXpub', this.polkadotApi.api)
    // Call Extrinsic
    return this.polkadotApi.api.tx.nbvStorage.removeXpub().signAndSend(user)
  }
}

export default NbvStorageApi
