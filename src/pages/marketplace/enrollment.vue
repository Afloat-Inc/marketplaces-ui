<template lang="pug">
#container
    .text-h6 Enrollment
    #applicantDetails(v-for="applicant in applicants")
      q-card.q-my-sm
        applicant-expander-item(v-bind="applicant")

</template>

<script>
import ApplicantExpanderItem from '~/components/marketplace/applicant-expander-item'

export default {
  name: 'MarketplaceEnrollmentScreen',
  components: { ApplicantExpanderItem },
  props: {
    applicants: {
      type: Array,
      default: () => []
    }
  }
}
</script>
