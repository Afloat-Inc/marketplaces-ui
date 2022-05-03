<template lang="pug">
.full-width
  .text-h5 {{ title }}
    q-input(
      label="WSS URL"
      :rules="[val => val.length > 0 || 'Requeried field' ]"
      v-model="wssUrl"
    )
  .row(v-if="connResultPolkadot")
    p {{`You are connected to chain ${connResultPolkadot.chain} using ${connResultPolkadot.nodeName} v${connResultPolkadot.nodeVersion}`}}
  .row
    .col
      q-btn.full-width(
        @click="connectPolkadot"
        label="Connect to polkadot"
      )
    .col
      q-btn.full-width(
        @click="requestUsers"
        label="Request users from Polkadot{js}"
      )
  .row(v-if="accounts" v-for="account in accounts")
    //- Identicon(
    //-   :size="128"
    //-   :value="account.address"
    //- )
    .text-bold {{ account.meta.name }} - {{ account.address }}
</template>

<script>
import { ref, onMounted } from 'vue'
import PolkadotApi from '~/services/polkadotApi.js'
import useNotification from '~/mixins/notifications'
// import Identicon from '@polkadot/vue-identicon'

export default {
  name: 'PolkadotExample',
  components: {
    // Identicon
  },
  setup () {
    const title = ref('Polkadot Example')
    const connResultPolkadot = ref(undefined)
    const accounts = ref(undefined)
    const wssUrl = ref(undefined)
    const { showNotification, showLoading, hideLoading } = useNotification()

    onMounted(() => {
      try {
        wssUrl.value = 'wss://n1.hashed.systems'
      } catch (e) {
        console.error(e)
      }
      // console.log('onMounted', Identicon)
    })

    async function connectPolkadot () {
      try {
        connResultPolkadot.value = undefined
        showLoading()
        const api = new PolkadotApi({ wss: wssUrl.value })
        connResultPolkadot.value = await api.connect()
      } catch (e) {
        console.error('connectPolkadot', e)
        showNotification({ color: 'red', message: e.message || e })
      } finally {
        hideLoading()
      }
    }

    async function requestUsers () {
      try {
        showLoading({ message: 'Trying to get accounts, please review polkadot{js} extension' })
        const api = new PolkadotApi({ wss: wssUrl.value })
        accounts.value = await api.requestUsers()
      } catch (e) {
        console.error('requestUsers', e)
        showNotification({ color: 'red', message: e.message || e })
      } finally {
        hideLoading()
      }
    }

    return {
      title,
      requestUsers,
      connectPolkadot,
      connResultPolkadot,
      accounts,
      wssUrl
    }
  }
}
</script>
