<template lang="pug">
#container.q-pa-sm
  #applicantDetails(v-if="applicants.length > 0")
    q-card.q-my-md(v-for="applicant in applicants")
      applicant-expander-item(v-bind="{...applicant, showActions}" @onEnroll="onEnrollApplicant" @onReject="onRejectApplicant")
  #applicantDetailsEmpty(v-else)
    q-card(bordered)
      q-card-section
        .text-h5.q-py-lg {{$t('pages.marketplace.details.noApplicants')}}
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
    },
    showActions: {
      type: Boolean,
      default: false
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
