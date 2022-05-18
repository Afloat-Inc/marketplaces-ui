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
    return this.polkadotApi.api.derive.nbvStorage.xpub(user)
  }

  /**
   * @name getXpubByUser
   * @description Get Xpub by user
   * @param {String} id Xpub id
   * @returns {Object}
   * { id, xpub }
   */
  getXpubById (id) {
    return this.polkadotApi.api.derive.nbvStorage.xpub(id)
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
    return this.polkadotApi.api.tx.nbvStorage.submitXPUB(user, XPUB).signAndSend(user)
  }
}

export default NbvStorageApi
