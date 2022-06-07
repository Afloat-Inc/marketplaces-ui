/* eslint-disable dot-notation */
import PolkadotApi from '~/services/polkadotApi.js'
import { NbvStorageApi, MarketplaceApi } from '~/services/polkadot-pallets'

export default async ({ app, store }) => {
  const api = new PolkadotApi()
  await api.connect()
  console.log('PolkadotApiCreated', api)
  const nbvStorageApi = new NbvStorageApi(api)
  const marketplaceApi = new MarketplaceApi(api)
  store['$polkadotApi'] = api
  store['$nbvStorageApi'] = nbvStorageApi
  store['$marketplaceApi'] = marketplaceApi
}
