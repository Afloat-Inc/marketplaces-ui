<template lang='pug'>
#container
  applicants-list(:applicants="applicants" :showActions="showActions")
</template>
<script>
import ApplicantsList from 'src/components/marketplace/applicants-list.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CustodianIndex',
  components: {
    ApplicantsList
  },
  data () {
    return {
      applicants: undefined,
      showActions: false
    }
  },
  computed: {
    ...mapState('polkadotWallet', ['selectedAccount'])
  },
  watch: {
    'selectedAccount.address': {
      async handler () {
        this.applicants = []
        const isLoggedIn = await this.$store.$hashedPrivateApi.isLoggedIn()
        if (!isLoggedIn) {
          await this.loginUser()
        }
        await this.getApplications()
      }
    }
  },
  beforeMount () {
    this.getApplications()
  },
  methods: {
    ...mapMutations('polkadotWallet', ['setIsLoggedIn']),
    async getApplications () {
      try {
        this.showLoading({ message: 'Getting applications where you are custodian' })
        const response = await this.$store.$marketplaceApi.getApplicationsByCustodian({
          account: this.selectedAccount.address
        })
        const applicantsHP = await this.getFromHP(response)
        this.applicants = applicantsHP
      } catch (error) {
        console.log(error)
        this.showNotification({ message: error.message || error, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async getFromHP (applicants) {
      console.log('applicants', applicants)
      const promisesFields = []
      let tmpApplicants = applicants
      const isLogged = await this.$store.$hashedPrivateApi.isLoggedIn()
      this.setIsLoggedIn(isLogged)
      if (!isLogged) {
        await this.loginUser()
      }
      try {
        tmpApplicants.forEach((applicant, indexApplicant) => {
          applicant.fields.forEach(privateFields => {
            const identifier = 'File:'
            let cid = privateFields.displayName.includes(identifier)
              ? privateFields.custodianCid.split(':')[0]
              : privateFields.custodianCid
            if (cid.split(':').length > 1) {
              cid = cid.split(':')[0]
            }
            promisesFields.push(this.$store.$hashedPrivateApi.sharedViewByCID(cid))
          })
        })
        const resolvedFields = await Promise.all(promisesFields)
        console.log('resolvedNotes', resolvedFields)
        tmpApplicants.forEach((applicant, indexApplicant) => {
          const lengthFields = applicant.fields.length
          applicant.fields = applicant.fields.map((file, index) => {
            const _index = (indexApplicant * lengthFields) + index
            // console.log('Resolved Fields', resolvedFields[_index])
            const displayName = resolvedFields[_index]?.name
            const description = resolvedFields[_index]?.description
            const cid = resolvedFields[_index]?.custodianCid
            const payload = resolvedFields[_index]?.payload
            return {
              description,
              displayName,
              payload,
              cid
            }
          })
          return applicant
        })
      } catch (error) {
        console.error('error', error)
        tmpApplicants = applicants
      }
      return tmpApplicants
    },
    async loginUser () {
      try {
        this.showLoading({ message: 'You must be logged in to submit an application' })
        await this.$store.$hashedPrivateApi.login(this.selectedAccount.address)
        this.setIsLoggedIn(true)
      } catch (error) {
        console.error(error)
        this.showNotification({ message: error.message || error, color: 'negative' })
        this.setIsLoggedIn(false)
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
<style lang='styl'>

</style>
