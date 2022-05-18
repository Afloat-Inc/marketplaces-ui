/* eslint-disable dot-notation */
// import Vue from 'vue'
import notifications from '~/mixins/notifications'
import PolkadotApi from '~/services/polkadotApi.js'

export default async ({ app, store }) => {
  app.mixin(notifications)
  const api = new PolkadotApi({ wss: 'wss://n1.hashed.systems' })
  store['$polkadotApi'] = api
  app.provide('$polkadotApi', api)
}
