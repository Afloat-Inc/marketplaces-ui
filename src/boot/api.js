/* eslint-disable dot-notation */
import PolkadotApi from '~/services/polkadotApi.js'
import { TreasuryApi, NbvStorageApi } from '~/services/polkadot-pallets'

export default async ({ app, store }) => {
  const api = new PolkadotApi()
  await api.connect()
  console.log('PolkadotApiCreated', api)
  const treasuryApi = new TreasuryApi(api)
  const nbvStorageApi = new NbvStorageApi(api)
  store['$polkadotApi'] = api
  store['$treasuryApi'] = treasuryApi
  store['$nbvStorageApi'] = nbvStorageApi
  app.provide('$polkadotApi', api)
  app.provide('$treasuryApi', treasuryApi)
  app.provide('$nbvStorageApi', nbvStorageApi)
  // app.provide('$isValidAddressPolkadotAddress', isValidAddressPolkadotAddress)
}
