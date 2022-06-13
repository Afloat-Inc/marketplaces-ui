<template lang="pug">
q-form.q-pa-xl.q-gutter-y-md(@submit="submitForm")
    q-btn.float-right(
      icon="close"
      round
      unelevated
      color="primary"
      v-close-popup
      size="sm"
    )
    .text-h4.q-mb-lg Create new marketplace
    t-input(
      testid="label_input"
      label="Label"
      v-model="label"
      :rules="[rules.required]"
      placeholder="Please write a description"
      autofocus
    )
    q-btn.float-right.q-mb-md(
      data-testid="submit_btn"
      unelevated
      label="Create marketplace"
      color="primary"
      size="md"
      type="submit"
      no-caps
    )
</template>

<script>
import { validation } from '~/mixins/validation'

/**
 * This component is used to fill form to create a new marketplace
 */
export default {
  name: 'CreateMarketplaceForm',
  mixins: [validation],
  emits: ['submittedForm'],
  data () {
    return {
      label: undefined
    }
  },
  methods: {
    async submitForm () {
      try {
        const data = {
          label: this.label
        }
        /**
         * This event is emitted when the form is filled and submitted
         */
        this.$emit('submittedForm', data)
      } catch (e) {
        console.error('submitProposal', e)
      }
    }
  }
}
</script>
