<template lang="pug">
q-card.q-pa-sm.container.card-btn(v-ripple @click="onClick")
  .row.justify-center
    q-icon(name="store" size="4em" color="primary")
  #labels
    .text-subtitle1 Label
    .text-body2 {{ label }}
    q-separator.q-my-sm
    .text-body2 {{ $t('general.loremShort') }}
</template>

<script>

/**
 * This component display all marketplace info in a list
 */
export default {
  name: 'MarketplaceItem',
  props: {
    id: {
      type: String,
      default: undefined
    },
    label: {
      type: String,
      default: undefined
    }
  },
  emits: ['onClick'],
  methods: {
    onClick () {
      const marketplace = {
        label: this.label,
        id: this.id
      }
      this.$emit('onClick', marketplace)
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  min-height: 20vh
</style>
