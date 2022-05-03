// import Vue from 'vue'
import notifications from '~/mixins/notifications'

export default async ({ app }) => {
  app.mixin(notifications)
  app.provide('$test', 'test')
}
