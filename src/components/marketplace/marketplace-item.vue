<template lang="pug">
q-card.q-pa-sm.container.card-btn(v-ripple @click="onClick")
  .row.justify-center
    q-icon(name="store" size="4em" color="primary")
  #labels
    .text-subtitle1.text-weight-bold Label
    .text-body2 {{ label }}
    q-separator.q-my-sm
    .text-body2 {{ $t('general.loremShort') }}
    q-separator.q-my-sm
    .text-subtitle1.text-weight-bold Administrator
    account-item(:address="administrator" flat)
</template>

<script>
import { AccountItem } from '~/components/common'

/**
 * This component display all marketplace info in a list
 */
export default {
  name: 'MarketplaceItem',
  components: { AccountItem },
  props: {
    id: {
      type: String,
      default: undefined
    },
    label: {
      type: String,
      default: undefined
    },
    administrator: {
      type: String,
      default: undefined
    }
  },
  emits: ['onClick'],
  methods: {
    onClick () {
      const marketplace = {
        id: this.id,
        label: this.label,
        administrator: this.administrator
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
