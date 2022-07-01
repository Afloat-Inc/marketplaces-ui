import { HashedPrivate } from '@smontero/hashed-private-client-api'
class HashedPrivateApi {
  constructor ({ ipfsURL, privateURI, signFn }) {
    this.ipfsURL = ipfsURL
    this.privateURI = privateURI
    this.signFn = signFn
    this.api = undefined
  }

  /**
   * The following method is used to connect to the Hashed Private Service
   * @returns undefined
   */
  async connect () {
    try {
      this.api = new HashedPrivate({
        ipfsURL: this.ipfsURL,
        privateURI: this.privateURI,
        signFn: this.signFn
      })
      console.log('HP connected', this.api)
    } catch (e) {
      console.error('connect Hashed Private Api', e)
      throw new Error(e)
    }
  }

  /**
   * The following method is used to create a session on the Hashed Private Service
   * @param {string} address The address of the user to log in
   * @returns undefined
   */
  async login (address) {
    try {
      const response = await this.api.login(address)
      console.log('HP login', response)
      return response
    } catch (e) {
      console.error('Login Hashed Private Api', e)
      throw new Error(e)
    }
  }

  /**
   * The following method is used to close the session on the Hashed Private Service
   * @returns undefined
   */
  async logout () {
    try {
      const response = await this.api.logout()
      console.log('HP logout', response)
      return response
    } catch (e) {
      console.error('Login Hashed Private Api', e)
      throw new Error(e)
    }
  }

  /**
   * Used to retrieve the status of the logged in user
   * @returns {Boolean} true if the user is logged in, false otherwise
   */
  async isLoggedIn () {
    try {
      const response = await this.api.isLoggedIn()
      return response
    } catch (e) {
      console.error('isLoggedIn Hashed Private Api', e)
      throw new Error(e)
    }
  }

  /**
   * Store a payload [Object|File] in the Hashed Private Service
   * @param {int} [id] of the owned data record to update
   * @param {string} name
   * @param {string} description should NOT be shorter than 5 characters
   * @param {Object|File} payload to be ciphered and stored
   * @return {Object} representing the owned data record with the following structure
   * {
   *  "id": 69,
   *  "name": "name",
   *  "description": "desc",
   *  "type": "json",
   *  "cid": "QmeHEb5TF4zkP2H6Mg5TcrvDs5egPCJgWFBB7YZaLmK7jr",
   *  "original_cid": "QmeHEb5TF4zkP2H6Mg5TcrvDs5egPCJgWFBB7YZaLmK7jr",
   *  "iv": "d232f60b340d7235beafed405b08b811",
   *  "mac": "6da9ce5375af9cdadf762e0910674c8b10b0c2c87500ce5c36fe0d2c8ea9fa5d",
   *  "started_at": "2022-06-14T13:43:15.108+00:00",
   *  "ended_at": null,
   *  "is_deleted": false
   * }
   *
   */
  async upsert ({ name, description, payload }) {
    try {
      const response = await this.api.ownedData().upsert({ name, description, payload })
      return response
    } catch (e) {
      console.error('upsert Hashed Private Api', e)
      throw new Error(e)
    }
  }

  /**
   * The following method is used to retrieve the private data record using the ID of the own data record
   * @param {int} id the id of the own data to retrieve
   * @returns {Object} representing the own data record
   */
  async ownViewById (id) {
    try {
      const response = await this.api.ownedData().viewByID({ id })
      return response
    } catch (e) {
      console.error('ownViewById Hashed Private Api', e)
      throw new Error(e)
    }
  }

  /**
   * The following method is used to retrieve the own data record using the Cid
   * @param {string} cid The cid of the data record to retrieve
   * @returns {Object} representing the own data record
   */
  async ownViewByCID (cid) {
    try {
      const response = await this.api.ownedData().viewByCID({ cid })
      return response
    } catch (e) {
      console.error('ownViewByCID Hashed Private Api', e)
      throw new Error(e)
    }
  }

  /**
   * The following method is used to share a data record with a user using the ID of the own data record
   * @param {string} toUserAddress The address of the user to share the data with
   * @param {int} originalOwnedDataId of the shared data record to share
   * @returns
   */
  async shareExisting ({ toUserAddress, originalOwnedDataId }) {
    try {
      const response = await this.api.sharedData().shareExisting({ toUserAddress, originalOwnedDataId })
      return response
    } catch (e) {
      console.error('shareExisting Hashed Private Api', e)
      throw new Error(e)
    }
  }

  /**
   * The following method is used to share a data record with creating a new record on the service
   * @param {string} toUserAddress The address of the user to share the data with
   * @param {string} name The name of the data record to share
   * @param {string} description The description of the data record to share
   * @param {Object|File} payload The payload of the data record to share
   * @returns
   */
  async shareNew ({ toUserAddress, name, description, payload }) {
    try {
      const response = await this.api.sharedData().shareNew({ toUserAddress, name, description, payload })
      return response
    } catch (e) {
      console.error('shareNew Hashed Private Api', e)
      throw new Error(e)
    }
  }

  /**
   * The following method is used to retrieve the private data record using the ID of the shared data record
   * @param {int} id the id of the shared data to retrieve
   * @returns {Object} representing the shared data record
   */
  async sharedViewById (id) {
    try {
      const response = await this.api.sharedData().viewByID({ id })
      return response
    } catch (e) {
      console.error('sharedViewById Hashed Private Api', e)
      throw new Error(e)
    }
  }

  /**
   * The following method is used to retrieve the shared data record using the Cid
   * @param {string} cid The cid of the data record to retrieve
   * @returns {Object} representing the shared data record
   */
  async sharedViewByCID (cid) {
    try {
      const response = await this.api.sharedData().viewByCID({ cid })
      return response
    } catch (e) {
      console.error('sharedViewByCID Hashed Private Api', e)
      throw new Error(e)
    }
  }
}
export default HashedPrivateApi
