<template lang="pug">
q-form.q-pa-xl.q-gutter-y-md(@submit="submitForm")
    q-btn.float-right(
      icon="close"
      round
      color="negative"
      v-close-popup
      size="sm"
    )
    .text-h4.q-mb-lg Create new proposal
    .row.items-center.q-col-gutter-md.q-my-sm
      .col-7
        q-input(
          outlined
          label="Recipient address"
          v-model="recipientAddress"
          :rules="[rules.required, rules.isValidMainetBTC]"
        )
      .col
        .text-body2 {{ $t('general.lorem')  }}
    .row.items-center.q-col-gutter-md.q-my-sm
      .col-7
        q-input(
          outlined
          label="Amount in Satoshi"
          v-model="amountInSats"
          :rules="[rules.required, rules.positiveInteger]"
        )
      .col
        .text-body2 {{ $t('general.loremShort')  }}
    q-btn.float-right.q-mb-md(
        label="Create Proposal"
        color="primary"
        size="md"
        type="submit"
    )
</template>

<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'CreateProposalForm',
  mixins: [validation],
  props: {
    signer: {
      type: String,
      default: undefined
    }
  },
  emits: ['submittedForm'],
  data () {
    return {
      recipientAddress: undefined,
      amountInSats: undefined
    }
  },
  methods: {
    async submitForm () {
      try {
        const data = {
          recipientAddress: this.recipientAddress,
          amountInSats: this.amountInSats
        }
        this.$emit('submittedForm', data)
      } catch (e) {
        console.error('submitProposal', e)
      }
    }
  }
}
</script>
