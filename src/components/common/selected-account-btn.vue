<template lang="pug">
.q-pa-xs(flat class="bg-primary")
  q-item
    //-   .row.q-gutter-x-sm.items-center
    q-item-section.vertical-middle(v-if="selectedAccount")
      account-icon.vertical-middle(:address="selectedAccount.address" size="2.5em")
    q-item-section.title-section
        q-item-label.text-body2.text-white(v-if="!selectedAccount") Choose an account
        q-item-label.title-section.text-body2.text-white(v-else) {{ selectedAccount.meta.name }}
    q-item-section
        q-icon.q-ml-sm(name="arrow_drop_down")

</template>

<script>
import AccountIcon from '~/components/common/account-icon.vue'
export default {
  name: 'SelectedAccountBtn',
  components: { AccountIcon },
  props: {
    selectedAccount: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="stylus" scoped>
.title-section
    min-width: 90px !important
</style>
