<template lang="pug">
#container
  q-card(flat class="card-style")
    q-card-section
      .row.justify-between
        .text-h5 {{market.label}}
    q-card-section
      .text-subtitle2.text-weight-regular.q-my-md {{ $t('pages.marketplace.details.numberPaparticipantsTitle') }}
        .text-body2 {{participants.length}}
      .row.q-col-gutter-md
        .col-6.q-pb-md
          .text-subtitle2.text-weight-regular {{ $t('pages.marketplace.role.administrator') }}
          account-item(
            :address="market.admin?.address"
          )
        .col-6.q-pb-md
          .text-subtitle2.text-weight-regular {{ $t('pages.marketplace.role.owner') }}
          account-item(
            :address="market.owner?.address"
          )
      .row
        .col-12
          .text-subtitle2.text-weight-regular.q-py-md {{$t('pages.marketplace.details.participantsTitle')}}
          .row.q-gutter-md(v-if="participants.length > 0 ")
            account-item(
              v-for="participant in participants"
              :address="participant"
              bordered
              shortDisplay
            )
          .row.q-gutter-md(v-else)
            .col-12
              .text-subtitle2.text-weight-regular {{$t('pages.marketplace.details.noParticipants')}}
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
