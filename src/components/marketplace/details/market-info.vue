<template lang="pug">
#container
  q-card(bordered flat)
    q-card-section
      .row.justify-center
        .text-h6 {{market.name}}
    q-card-section
      .row
        .col-6
          .text-subtitle2 Owner
          account-item(:address="market.owner" flat)
        .col-6
          .row.justify-end
            .text-subtitle2 State of Tax Credits
          .row.justify-end
            .text-subtitle2 Michigan
    q-card-section
      .row
        .col-6
          .text-subtitle2 Tax Credits
          .text-subtitle2 {{market.taxCredits}}
    q-separator
    q-card-section
</template>

<script>
import AccountItem from '~/components/common/account-item.vue'
export default {
  name: 'MarketInfo',
  components: { AccountItem },
  props: {
    market: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      marketInfo: {
        owner: '',
        taxCredits: ''
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
