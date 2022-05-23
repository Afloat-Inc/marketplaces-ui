/* eslint-disable dot-notation */
// import Vue from 'vue'
import notifications from '~/mixins/notifications'
// import { validation } from '~/mixins/validation'
export default async ({ app }) => {
  app.mixin(notifications)
  // app.mixin(validation)
}
