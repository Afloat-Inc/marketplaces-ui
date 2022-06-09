<template lang="pug">
#container
  q-card(bordered flat)
    q-card-section
      .row.justify-center
        .text-h5 {{market.label}}
    q-card-section
      .row
        .col-6
          .text-h6 Owner
          account-item(
            :address="market.administrator"
            flat
          )
        .col-6
          .row.justify-end
            .text-h6 Number of participants: {{participants.length}}
      .row
        .col-12
          q-separator
          .text-h6.q-py-md {{$t('pages.marketplace.details.participantsTitle')}}
          .row.q-gutter-md
            account-item.no-shadow(
              v-for="participant in participants"
              :address="participant.address"
              bordered
              shortDisplay
            )
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
    },
    /**
     * This props contains the participants of the market [Required]
     * @type {Array}
     */
    participants: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      marketInfo: {
        owner: undefined,
        admin: undefined,
        appraiser: undefined,
        label: undefined
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
