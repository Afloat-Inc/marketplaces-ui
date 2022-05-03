<template lang="pug">
div
    .text-bold.test.global-font This is a test component
    q-btn(
      @click="connectPolkadot"
      label="test polkadot"
    )
    q-btn(
      @click="requestUsers"
      label="request users"
    )
</template>

<script>
import PolkadotApi from '~/services/polkadotApi.js'
export default {
  name: 'TestingVue3',
  methods: {
    connectPolkadot () {
      const api = new PolkadotApi()
      api.connect()
    },
    requestUsers () {
      const api = new PolkadotApi()
      api.requestUsers()
    }
  }
}
</script>

<style lang="stylus">
.test
  color: red
</style>
