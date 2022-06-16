<template lang="pug">
#container
  q-card(bordered flat)
    q-card-section
      .row.justify-center
        .text-h2 {{market.label}}
    q-card-section
      .row
        .col-7.q-pb-md
          .label Administrator
          account-item(
            :address="market.admin?.address"
            flat
          )
        .col-5
          .row.justify-end
            .label Number of participants: {{participants.length}}
      .row
        .col-7.q-pb-md
          .label Owner
          account-item(
            :address="market.owner?.address"
            flat
          )
      .row
        .col-12
          q-separator
          .label.q-py-md {{$t('pages.marketplace.details.participantsTitle')}}
          .row.q-gutter-md(v-if="participants.length > 0 ")
            account-item.no-shadow(
              v-for="participant in participants"
              :address="participant"
              bordered
              shortDisplay
            )
          .row.q-gutter-md(v-else)
            .col-12
              .text-subtitle2 {{$t('pages.marketplace.details.noParticipants')}}
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
      required: true,
      default: () => []
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
