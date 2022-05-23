<template lang="pug">
q-menu(fit auto-close)
    q-list
        q-item(clickable v-for="account in accounts" @click="selectAccount(account)" :class="[isSelected(account) ? 'bg-primary text-white text-bold' : 'text-primary']")
          q-item-section(avatar)
            account-icon(:address="account.address" size="1.8em")
          q-item-section
            q-item-label {{ account.meta.name }}
            q-item-label {{ account.address }}
          q-separator
</template>

<script>
import AccountIcon from '~/components/common/account-icon.vue'
export default {
  name: 'AccountsMenu',
  components: { AccountIcon },
  props: {
    accounts: {
      type: Array,
      default: () => []
    },
    selectedAccount: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['selectAccount'],
  methods: {
    isSelected (account) {
      // bg-primary text-white
      if (!this.selectedAccount) return false
      return account.address === this.selectedAccount.address
    },
    selectAccount (account) {
      this.$emit('selectAccount', account)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
