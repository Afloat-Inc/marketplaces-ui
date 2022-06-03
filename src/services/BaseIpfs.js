// import IpfsClient from 'nano-ipfs-store'
import { create } from 'ipfs-http-client'
import all from 'it-all'
import { concat as uint8ArrayConcat } from 'uint8arrays/concat'
import mime from 'mime-types'

class BaseIpfs {
  constructor () {
    this.client = create(new URL(process.env.IPFS_URL))
  }

  async store (payload) {
    const cid = await this.addAsJson(payload)
    return this.getTypeCid(cid, 'json')
  }

  /**
   *
   * @param {String} typeCid
   */
  async retrieve (typeCid) {
    const { cid, type, extension } = this.parseTypeCid(typeCid)
    const payload = await this._retrieve(cid, type, extension)
    if (!payload) {
      throw new Error(`No handler for type: ${type}`)
    }
    return {
      type,
      extension,
      payload
    }
  }

  /**
   * @param {String} cid
   * @param {String} type
   */
  async _retrieve (cid, type, extension) {
    if (extension === 'json') {
      return this.getFromJson(cid)
    }
    return null
  }

  /**
   * @param {*} data to store, the data will be JSON stringified
   * before storing
   * @returns {String} cid of the stored data
   */
  async addAsJson (data) {
    const json = JSON.stringify(data)
    const response = await this.add(json)
    return response.path
  }

  /**
   * @param {String} cid of the data that is wanted
   * @returns {*} JSON parsed data identified by the cid
   */
  async getFromJson (cid) {
    const data = await this.cat(cid)
    return JSON.parse(new TextDecoder('utf-8').decode(data))
  }

  /**
   * @param {String or Uint8Array} data to store
   * @returns {String} cid of the stored data
   */
  async add (data) {
    return this.client.add(data)
  }

  /**
   * @param {String} cid of the data that is wanted
   * @returns {String} data identified by the cid
   */
  async cat (cid) {
    return uint8ArrayConcat(await all(this.client.cat(cid)))
  }

  /**
   * @param {String} cid of the data that is wanted
   * @returns {Uint8Array} data identified by the cid
   */
  async get (cid) {
    return this.client.get(cid)
  }

  /**
   *
   * @param {String} cid
   * @param {String} extensionType extension or content type
   */
  getTypeCid (cid, extensionType) {
    const extension = extensionType.indexOf('/') > -1 ? mime.extension(extensionType) : extensionType
    return `${cid.path}:${extension}`
  }

  /**
   *
   * @param {String} typeCid
   */
  parseTypeCid (typeCid) {
    const [cid, extension] = typeCid.split(':')
    return {
      cid,
      extension,
      type: mime.lookup(extension)
    }
  }
}

export default BaseIpfs
