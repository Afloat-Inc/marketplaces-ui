/* eslint-disable dot-notation */
import PolkadotApi from '~/services/polkadotApi.js'
import HashedPrivateApi from '~/services/HashedPrivateApi'
import { showGlobalLoading, hideGlobalLoading, showGlobalNotification } from '~/mixins/notifications'
import { NbvStorageApi, MarketplaceApi } from '~/services/polkadot-pallets'
export default async ({ app, store }) => {
  try {
    showGlobalLoading({
      message: 'Connecting with server'
    })
    const api = new PolkadotApi()
    await api.connect()
    const nbvStorageApi = new NbvStorageApi(api, showGlobalLoading)
    const marketplaceApi = new MarketplaceApi(api, showGlobalLoading)
    console.log('PolkadotApiCreated', api)
    hideGlobalLoading()
    showGlobalLoading({
      message: 'Connecting with Hashed Private Server'
    })
    const signFn = async (address, message) => {
      const { signature } = await marketplaceApi.signMessage(message, address)
      return signature
    }
    const hp = new HashedPrivateApi({
      ipfsURL: process.env.IPFS_URL,
      privateURI: process.env.PRIVATE_URI,
      signFn
    })
    await hp.connect()
    console.log('Hashed Private Created', hp)
    store['$hashedPrivateApi'] = hp
    store['$polkadotApi'] = api
    store['$nbvStorageApi'] = nbvStorageApi
    store['$marketplaceApi'] = marketplaceApi
    store['$connectedToServer'] = true
  } catch (e) {
    store['$connectedToServer'] = false
    showGlobalNotification({ message: e.message || e, color: 'negative' })
  } finally {
    hideGlobalLoading()
  }
}
