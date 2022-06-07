<template lang="pug">
#container
    .text-h6 Enrollment
    .text-body2 {{ id }}
    .text-body2 {{ label }}
    .text-body2 {{ administrator }}
    #applicantDetails(v-for="applicant in applicants")
      q-card.q-my-sm
        applicant-expander-item(v-bind="applicant")

</template>

<script>
import ApplicantExpanderItem from '~/components/marketplace/applicant-expander-item'

export default {
  name: 'MarketplaceEnrollmentScreen',
  components: { ApplicantExpanderItem },
  data () {
    return {
      id: undefined,
      label: undefined,
      administrator: undefined,
      applicants: []
    }
  },
  beforeMount () {
    this.syncParams()
    this.getApplicants()
  },
  methods: {
    syncParams () {
      const params = this.$route.params
      if (params && params.id) {
        this.id = params.id
        this.label = params.label
        this.administrator = params.administrator
      } else {
        this.$router.replace({
          name: 'marketplace'
        })
      }
    },
    getApplicants () {
      const applicant1 = {
        id: '0',
        address: '5DaWmLfzBTLbKFwBC5YxtAQ45XMSAQCDLcZL6zW9ZiJsGSST',
        notes: 'This is just a test',
        files: [
          {
            displayName: 'CV',
            cid: 'thisisacid'
          },
          {
            displayName: 'SAT',
            cid: 'thisisacid'
          },
          {
            displayName: 'Custom',
            cid: 'thisisacid'
          }
        ]
      }
      const applicant2 = {
        id: '1',
        address: '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym',
        notes: 'I want to apply to this marketplace',
        files: [
          {
            displayName: 'Profile',
            cid: 'thisisacid'
          },
          {
            displayName: 'Custom',
            cid: 'thisisacid'
          },
          {
            displayName: 'Custom',
            cid: 'thisisacid'
          }
        ]
      }
      const applicant3 = {
        id: '3',
        address: '5CmFmVadzNQFaeiyXXNugRXT1MuaoocUyogtYHEQeWjGp7pX',
        notes: 'I just want to see the marketplace',
        files: [
          {
            displayName: 'Custom',
            cid: 'thisisacid'
          },
          {
            displayName: 'Picture',
            cid: 'thisisacid'
          },
          {
            displayName: 'SAT',
            cid: 'thisisacid'
          }
        ]
      }
      this.applicants.push(applicant1)
      this.applicants.push(applicant2)
      this.applicants.push(applicant3)
    }
  }
}
</script>
