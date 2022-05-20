import BasePolkadotApi from '~/services/basePolkadotApi'

class NbvStorageApi extends BasePolkadotApi {
  constructor (polkadotApi) {
    super(polkadotApi, 'nbvStorage')
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
    // return this.polkadotApi.api.query.nbvStorage.xpubsByOwner(user, subTrigger)
    return this.exQuery('xpubsByOwner', user, subTrigger)
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
    // return this.polkadotApi.api.query.nbvStorage.xpubs(xpubId, subTrigger)
    return this.exQuery('xpubs', xpubId, subTrigger)
  }

  /**
   * @name getVaultsByUser
   * @description Get all vaults where user is owner or cosigner
   * @param {String} user User address
   * @returns {Array} array of vaults Id
   * [{ id }]
   */
  getVaultsByUser ({ user, subTrigger }) {
    return this.exQuery('vaultsBySigner', user, subTrigger)
    // return this.polkadotApi.api.derive.nbvStorage.vaults(user)
  }

  /**
   * @name getVaultsById
   * @description Get an array of vaults details
   * @param {String} Ids Array of vaults id
   * @param {Function} subTrigger Function to trigger when subscription detect changes
   * @returns {Array} list vaults array
   * [{ id, description, descriptor, owner, cosigners }]
   */
  getVaultsById ({ Ids, subTrigger }) {
    // return this.exQuery('vaults', Ids, subTrigger)
    return this.exMultiQuery('vaults', Ids, subTrigger)
    // return this.polkadotApi.api.derive.nbvStorage.vaults(user)
  }

  /**
   * @name createVault
   * @description Create a new vault
   * @param {String} user user address
   * @returns undefined
   */
  async createVault ({ threshold, description, cosigners, user }) {
    // Call Extrinsic
    return this.callTx('createVault', user, [threshold, description, cosigners])
  }

  /**
  * @name removeVault
  * @description Remove a vault
  * @param {String} id Vault id
  * @returns undefined
  */
  async removeVault ({ id, user }) {
    // Call Extrinsic
    return this.callTx('removeVault', user, [id])
  }

  /**
   * @name submitXPUB
   * @description Set XPUB for a user
   * @param {String} user user address
   * @returns undefined
   */
  async submitXPUB ({ user, XPUB }) {
    // Call Extrinsic
    return this.callTx('setXpub', user, [XPUB])
  }

  /**
   * @name submitXPUB
   * @description Set XPUB for a user
   * @param {String} user user address
   * @returns undefined
   */
  async removeXpub ({ user }) {
    // Call Extrinsic
    return this.callTx('removeXpub', user)
  }
}

export default NbvStorageApi
