<template lang="pug">
#container
    .text-h6 Applicants
    #applicantDetails(v-for="applicant in applicants")
      q-card.q-my-sm
        applicant-expander-item(v-bind="applicant" @onEnroll="onEnrollApplicant" @onReject="onRejectApplicant")
</template>

<script>
import ApplicantExpanderItem from '~/components/marketplace/applicant-expander-item'

/**
 * This component handler the applicants list
 */
export default {
  name: 'ApplicantsList',
  components: { ApplicantExpanderItem },
  props: {
    applicants: {
      type: Array,
      default: () => []
    }
  },
  emits: ['onEnrollApplicant', 'onRejectApplicant'],
  methods: {
    onEnrollApplicant (data) {
      /**
       * This event is emitted when the user do click in enroll for an list's applicant
       */
      this.$emit('onEnrollApplicant', data)
    },
    onRejectApplicant (data) {
      /**
       * This event is emitted when the user do click in reject for an list's applicant
       */
      this.$emit('onRejectApplicant', data)
    }
  }
}
</script>
