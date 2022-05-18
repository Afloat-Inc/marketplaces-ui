/* eslint-disable dot-notation */
// import Vue from 'vue'
import notifications from '~/mixins/notifications'

export default async ({ app, store }) => {
  app.mixin(notifications)
}
