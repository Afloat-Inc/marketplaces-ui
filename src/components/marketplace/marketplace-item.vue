<template lang="pug">
q-card.q-pa-sm.container.card-btn(v-ripple @click="onClick")
  .row.justify-center
    q-icon(name="store" size="4em" color="primary")
  #labels
    .text-subtitle1.text-weight-bold {{ marketplace?.value.label }}
    q-separator.q-my-sm
    .text-subtitle1.text-weight-bold {{ $t('pages.marketplace.role.administrator') }}
    account-item(:address="marketplace?.administrator" flat shortDisplay)
    .text-subtitle1.text-weight-bold {{ $t('pages.marketplace.role.owner') }}
    account-item(:address="marketplace?.owner" flat shortDisplay)
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
    marketplace: {
      type: Object,
      default: undefined
    }
  },
  emits: ['onClick'],
  methods: {
    onClick () {
      const marketplace = {
        id: this.marketplace.id,
        label: this.marketplace.value.label,
        administrator: this.marketplace.administrator
      }
      console.log(marketplace)
      this.$emit('onClick', marketplace)
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  min-height: 35vh
</style>
