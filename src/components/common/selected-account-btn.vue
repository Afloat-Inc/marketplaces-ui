<template lang="pug">
.q-pa-xs(flat class="bg-primary")
  q-item
    //-   .row.q-gutter-x-sm.items-center
    q-item-section
        q-avatar(v-if="selectedAccount" color="secondary" text-color="white" size="sm") {{ selectedAccount.meta.name.substring(0, 1) }}
    q-item-section.title-section
        q-item-label.text-body2.text-white(v-if="!selectedAccount") Choose an account
        q-item-label.title-section.text-body2.text-white(v-else) {{ selectedAccount.meta.name }}
    q-item-section
        q-icon.q-ml-sm(name="arrow_drop_down")

</template>

<script>
export default {
  name: 'SelectedAccountBtn',
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
