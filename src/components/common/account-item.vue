<template lang="pug">
q-card(:flat="flat" :class="{'inherit': inherit}")
  q-item
    q-item-section(avatar)
      account-icon(:address="address" size="2em")
    q-item-section {{ displayName }}
</template>

<script>
import AccountIcon from '~/components/common/account-icon.vue'
import { mapGetters } from 'vuex'

/**
 * Component used to show user info (using polkadot address)
 */
export default {
  name: 'AccountItem',
  components: { AccountIcon },
  props: {
    /**
     * Polkadot user address
     */
    address: {
      type: String,
      default: undefined
    },
    flat: {
      type: Boolean,
      default: false
    },
    inherit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      accountInfo: undefined
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['availableAccounts']),
    displayName () {
      if (this.accountInfo) {
        const identity = this.accountInfo?.identity
        const localDisplay = this.availableAccounts.find(v => v.address === this.address)
        return (identity.display) ? identity.display : localDisplay?.meta?.name || this.address
      } return undefined
    }
  },
  watch: {
    address () {
      if (this.address) this.getAccountInfo()
    }
  },
  beforeMount () {
    if (this.address) {
      this.getAccountInfo()
    }
  },
  methods: {
    async getAccountInfo () {
      try {
        this.accountInfo = await this.$store.$polkadotApi.getAccountInfo(this.address)
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.inherit
  background-color: inherit
</style>
