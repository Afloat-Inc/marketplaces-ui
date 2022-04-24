<template lang="pug">
.full-width
  .text-h5 {{ title }}
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
import { useStore } from 'vuex'

// import Identicon from '@polkadot/vue-identicon'

export default {
  name: 'PolkadotExample',
  components: {
    // Identicon
  },
  setup () {
    const title = ref('Polkadot template')
    const connResultPolkadot = ref(undefined)
    const accounts = ref(undefined)
    const $store = useStore()

    onMounted(() => {
      try {
        console.log('env', process.env.VUE_APP_ENV)
        console.log('ualAuthenticator', $store)
      } catch (e) {
        console.error(e)
      }
      // console.log('onMounted', Identicon)
    })

    async function connectPolkadot () {
      const api = new PolkadotApi()
      connResultPolkadot.value = await api.connect()

      const authenticator = $store.$ual.authenticators[0]
      await authenticator.init()
      const users = await authenticator.login()
      console.log('requestAccount', authenticator, users)
    }

    async function requestUsers () {
      const api = new PolkadotApi()
      accounts.value = await api.requestUsers()
    }

    return {
      title,
      requestUsers,
      connectPolkadot,
      connResultPolkadot,
      accounts
    }
  }
}
</script>
