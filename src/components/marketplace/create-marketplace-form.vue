<template lang="pug">
q-form.q-pa-xl.q-gutter-y-md(@submit="submitForm")
    q-btn.float-right(
      icon="close"
      round
      unelevated
      color="secondary"
      v-close-popup
      size="sm"
    )
    .text-h4.q-mb-lg {{ $t('pages.marketplace.createForm.title') }}
    q-input(
      testid="label_input"
      :label="$t('pages.marketplace.createForm.label')"
      v-model="label"
      outlined
      :rules="[rules.required]"
      :placeholder="$t('pages.marketplace.createForm.placeholder')"
      autofocus
    )
    q-btn.float-right.q-mb-md(
      data-testid="submit_btn"
      outline
      unelevated
      :label="$t('pages.marketplace.createForm.button')"
      color="secondary"
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
