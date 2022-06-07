<template lang="pug">
#container
  q-card(bordered flat)
    q-card-section
      .row.justify-center
        .text-h6 {{market.label}}
    q-card-section
      .row
        .col-6
          .text-subtitle2 Owner
          account-item(:address="market.administrator" flat)
        .col-6
          .row.justify-end
            .text-subtitle2 State of Tax Credits
          .row.justify-end
            .text-subtitle2 Michigan
    q-card-section
      .row.justify-center.text-subtitle2 Tax Credits
      q-separator
      .row
        .col-12
          .text-subtitle2(v-for="credit in marketInfo.taxCredits")
            .row.justify-between
              div {{credit.state}}
              div {{credit.amount}}
    q-card-section
</template>

<script>
import AccountItem from '~/components/common/account-item.vue'
export default {
  name: 'MarketInfoCard',
  components: { AccountItem },
  props: {
    /**
     * This props contains the market information to display [Required]
     * @type {Object}
     */
    market: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      marketInfo: {
        owner: '',
        taxCredits: [
          {
            state: 'Michigan',
            taxCredits: 'lorem',
            amount: '500.30'
          },
          {
            state: 'Ohio',
            taxCredits: 'lorem',
            amount: '800.30'
          },
          {
            state: 'Pennsylvania',
            taxCredits: 'lorem',
            amount: '1000.30'
          }
        ]
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
