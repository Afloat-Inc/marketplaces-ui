/* eslint-disable dot-notation */
import PolkadotApi from '~/services/polkadotApi.js'
import { showGlobalLoading, hideGlobalLoading, showGlobalNotification } from '~/mixins/notifications'
import { NbvStorageApi, MarketplaceApi } from '~/services/polkadot-pallets'

export default async ({ app, store }) => {
  try {
    showGlobalLoading({
      message: 'Connecting with server'
    })
    const api = new PolkadotApi()
    await api.connect()
    console.log('PolkadotApiCreated', api)
    const nbvStorageApi = new NbvStorageApi(api, showGlobalLoading)
    const marketplaceApi = new MarketplaceApi(api, showGlobalLoading)
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
