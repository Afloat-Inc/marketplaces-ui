import BasePolkadotApi from '~/services/basePolkadotApi'

class NbvStorageApi extends BasePolkadotApi {
  constructor (polkadotApi) {
    super(polkadotApi)
    this.polkadotApi = polkadotApi
    this.tx = this.polkadotApi.api.tx.nbvStorage
    console.log('NbvStorageApi created')
  }

  /**
   * @name getXpubByUser
   * @description Get Xpub by user
   * @param {String} user User address
   * @param {Function} subTrigger Function to trigger when subscription detect changes
   * @returns {Object}
   * { id, xpub }
   */
  getXpubByUser (user, subTrigger) {
    return this.polkadotApi.api.query.nbvStorage.xpubsByOwner(user, subTrigger)
  }

  /**
   * @name getXpubByUser
   * @description Get Xpub by user
   * @param {String} xpubId Xpub id
   * @param {Function} subTrigger Function to trigger when subscription detect changes
   * @returns {Object}
   * { id, xpub }
   */
  getXpubById (xpubId, subTrigger) {
    return this.polkadotApi.api.query.nbvStorage.xpubs(xpubId, subTrigger)
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
    return this.tx.setXpub(XPUB).signAndSend(user)
    // this.tx['setXpub'](user. ..params).
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
