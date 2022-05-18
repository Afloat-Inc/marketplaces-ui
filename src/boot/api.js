/* eslint-disable dot-notation */
import PolkadotApi from '~/services/polkadotApi.js'
import { TreasuryApi } from '~/services/polkadot-pallets'
console.log('env', process.APP_NAME)
export default async ({ app, store }) => {
  const api = new PolkadotApi()
  api.connect()
  console.log('PolkadotApiCreated', api)
  const treasuryApi = new TreasuryApi(api)
  store['$polkadotApi'] = api
  store['$treasuryApi'] = treasuryApi
  app.provide('$polkadotApi', api)
  app.provide('$treasuryApi', api)
}
