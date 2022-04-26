<template lang="pug">
.full-width
    q-btn.full-width(
      @click="requestUser"
      label="Request user Ual"
    )
    .row.q-mt-md(v-if="accounts" v-for="account in accounts")
        .text-bold {{ account.accountName }}
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
export default {
  name: 'UalExample',
  setup () {
    const $store = useStore()
    const accounts = ref(undefined)

    async function requestUser () {
      const authenticator = $store.$ual.authenticators[0]
      await authenticator.init()
      accounts.value = await authenticator.login()
      console.log('requestAccount', authenticator, accounts)
    }

    return {
      requestUser,
      accounts
    }
  }
}
</script>
