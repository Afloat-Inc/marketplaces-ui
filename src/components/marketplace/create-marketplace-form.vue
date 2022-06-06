<template lang="pug">
q-form.q-pa-xl.q-gutter-y-md(@submit="submitForm")
    q-btn.float-right(
      icon="close"
      round
      color="primary"
      v-close-popup
      size="sm"
    )
    .text-h4.q-mb-lg Create new marketplace
    t-input(
      label="Label"
      v-model="label"
      :rules="[rules.required]"
      placeholder="Please write a description"
      autofocus
    )
    q-btn.float-right.q-mb-md(
        label="Create marketplace"
        color="primary"
        size="md"
        type="submit"
        no-caps
    )
</template>

<script>
import { validation } from '~/mixins/validation'
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
        this.$emit('submittedForm', data)
      } catch (e) {
        console.error('submitProposal', e)
      }
    }
  }
}
</script>
