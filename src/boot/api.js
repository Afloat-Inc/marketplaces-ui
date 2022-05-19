/* eslint-disable dot-notation */
import PolkadotApi from '~/services/polkadotApi.js'
import { TreasuryApi, NbvStorageApi } from '~/services/polkadot-pallets'

function subQuery () {
  console.log('subQuery arguments', arguments)
  // console.log('subQuery function to call', func)
}

export default async ({ app, store }) => {
  const api = new PolkadotApi()
  await api.connect()
  console.log('PolkadotApiCreated', api)
  const treasuryApi = new TreasuryApi(api)
  const nbvStorageApi = new NbvStorageApi(api)
  store['$polkadotApi'] = api
  store['$treasuryApi'] = treasuryApi
  store['$nbvStorageApi'] = nbvStorageApi
  store['$subQuery'] = subQuery
  app.provide('$polkadotApi', api)
  app.provide('$treasuryApi', treasuryApi)
  app.provide('$nbvStorageApi', nbvStorageApi)
}
