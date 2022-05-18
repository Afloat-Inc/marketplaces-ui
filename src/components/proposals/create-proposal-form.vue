<template lang="pug">
.q-pa-xl.q-gutter-y-md
    q-btn.float-right(
      icon="close"
      round
      color="negative"
      v-close-popup
      size="md"
    )
    .text-h4.q-mb-lg Submit treasury proposal
    .row.items-center.q-col-gutter-md.q-my-sm
        .col-7
            q-input(
                outlined
                label="Proposer"
                v-model="proposer"
            )
        .col
            .text-body2 This account will make the proposal and be responsible for the bond.
    .row.items-center.q-col-gutter-md.q-my-sm
        .col-7
            q-input(
                outlined
                label="Beneficiary"
                v-model="beneficiary"
            )
        .col
            .text-body2 The beneficiary will receive the full amount if the proposal passes.
    .row.items-center.q-col-gutter-md.q-my-sm
        .col-7
            q-input(
                outlined
                label="Value"
                v-model="value"
            )
        .col
            .text-body2 The value is the amount that is being asked for and that will be allocated to the beneficiary if the proposal is approved.
    //- .row.items-center.q-col-gutter-md.q-my-sm
    //-     .col-7
    //-         q-input(
    //-             outlined
    //-             label="Proposal Bond"
    //-             v-model="proposalBond"
    //-         )
    //-     .col
    //-         text-body2 Of the beneficiary amount, at least 5.00% would need to be put up as collateral. The maximum of this and the minimum bond will be used to secure the proposal, refundable if it passes.
    //- .row.items-center.q-col-gutter-md.q-my-sm
    //-     .col-7
    //-         q-input(
    //-             outlined
    //-             label="Minimum Bond"
    //-             v-model="minimumBond"
    //-         )
    //-     .col
    //-         //- text-body2 This account will make the proposal and be responsible for the bond.
    q-btn.float-right.q-mb-md(
        label="Create Proposal"
        color="primary"
        size="lg"
        @click="submitProposal"
    )
</template>

<script>
// import { mapGetters } from 'vuex'
import { Notify, QSpinnerFacebook } from 'quasar'
export default {
  name: 'CreateProposalForm',
  data () {
    return {
      proposer: '5CmFmVadzNQFaeiyXXNugRXT1MuaoocUyogtYHEQeWjGp7pX',
      beneficiary: '5CmFmVadzNQFaeiyXXNugRXT1MuaoocUyogtYHEQeWjGp7pX',
      value: '2',
      proposalBond: undefined,
      minimumBond: undefined
    }
  },
  computed: {
    // ...mapGetters('polkadotWallet', ['api'])
  },
  methods: {
    async submitProposal () {
      try {
        this.showLoading({
          message: 'Waiting for polkadot js response'
        })
        const r = await this.$store.$treasuryApi.submitProposal({
          proposer: this.proposer,
          beneficiary: this.beneficiary,
          value: this.value
        })
        console.log('submitProposal', r)
        this.showNotification({
          message: 'Proposal Submitted'
        })
      } catch (e) {
        console.error('submitProposal', e)
        this.showNotification({
          message: e.message || e,
          color: 'negative'
        })
      } finally {
        this.hideLoading()
      }
    },
    showNotification ({ message, color = 'green', icon = 'feedback' }) {
      Notify.create({
        message,
        color,
        position: 'bottom',
        timeout: 4000,
        actions: [
          { icon, color: 'white', handler: () => { /* ... */ } }
        ]
      })
    },
    showLoading (props) {
      let message, color, background
      const defaultMessage = 'Please wait a moment...'
      const defaultColor = 'white'
      const defaultBackground = 'gray'

      if (props) {
        message = props.message || defaultMessage
        color = props.color || defaultColor
        background = props.background || defaultBackground
      } else {
        message = defaultMessage
        color = defaultColor
        background = defaultBackground
      }

      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: color,
        spinnerSize: 140,
        backgroundColor: background,
        message: `<div class="text-h5">${message}</div>`,
        messageColor: color,
        html: true
      })
    },
    hideLoading () {
      this.$q.loading.hide()
    }
  }
}
</script>
