<template lang="pug">
q-form.q-pa-xl.q-gutter-y-md(@submit="submitForm")
    q-btn.float-right(
      icon="close"
      round
      color="negative"
      v-close-popup
      size="sm"
    )
    .text-h4.q-mb-lg Create new vault
    .row.items-center.q-col-gutter-md.q-my-sm
      .col-7
        q-input(
          outlined
          label="Description"
          v-model="description"
          :rules="[rules.required]"
        )
      .col
        .text-body2 {{ $t('general.lorem')  }}
    .row.items-center.q-col-gutter-md.q-my-sm
      .col-7
        q-select(
          outlined
          label="Cosigners"
          v-model="cosigners"
          use-input
          use-chips
          multiple
          hide-dropdown-icon
          @new-value="addCosigner"
          :rules="[rules.required, rules.containAtLeastCosigners(2), rules.containLessThanCosigners(7)]"
        )
      .col
        .text-body2 {{ $t('general.loremShort')  }}
    .row.items-center.q-col-gutter-md.q-my-sm
      .col-7
        q-input(
          outlined
          label="Threshold"
          v-model="threshold"
          :rules="[rules.required, rules.positiveInteger, rules.greaterOrEqualThan(2), rules.lessOrEqualThan(cosigners.length)]"
        )
      .col
        .text-body2 {{ $t('general.loremShort')  }}
    q-btn.float-right.q-mb-md(
        label="Create Vault"
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
      description: undefined,
      threshold: undefined,
      cosigners: []
    }
  },
  methods: {
    async submitForm () {
      try {
        const data = {
          description: this.description,
          threshold: this.threshold,
          cosigners: this.cosigners
        }
        this.$emit('submittedForm', data)
      } catch (e) {
        console.error('submitProposal', e)
      }
    },
    addCosigner (val, done) {
      console.log('addCosigner', val)
      if (this.signer === val) {
        this.showNotification({
          message: 'You cannot add your own account as a cosigner',
          color: 'negative'
        })
      } else if (this.$store.$polkadotApi.isValidPolkadotAddress(val)) {
        done(val, 'add-unique')
      } else {
        this.showNotification({
          message: 'This is not a valid POLKADOT address',
          color: 'negative'
        })
      }
    }
  }
}
</script>
