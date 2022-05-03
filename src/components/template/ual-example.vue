<template lang="pug">
.full-width
    .text-h5 UAL Example
    .row
        .col
            q-btn.full-width(
            @click="requestUser"
            label="Request user Ual"
            )
        .col
            q-btn.full-width(
            @click="logoutUAL"
            label="Logout user Ual"
            )
    .row.q-mt-md(v-if="accounts" v-for="account in accounts")
        .text-bold {{ account.accountName }}
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import useNotification from '~/mixins/notifications'

export default {
  name: 'UalExample',
  setup () {
    const $store = useStore()
    const accounts = ref(undefined)
    const { showNotification } = useNotification()

    async function requestUser () {
      try {
        accounts.value = await $store.dispatch('ualWallet/requestUser')
        $store.commit('ualWallet/setAuthenticator', accounts.value)
        $store.commit('ualWallet/setAccount', accounts.value[0].accountName)
      } catch (e) {
        showNotification({ color: 'red', message: e.message || e })
      }
    }

    async function logoutUAL () {
      try {
        await $store.dispatch('ualWallet/logoutUser')
        accounts.value = undefined
      } catch (e) {
        console.error('error', e)
      }
    }

    return {
      requestUser,
      logoutUAL,
      accounts
    }
  }
}
</script>
