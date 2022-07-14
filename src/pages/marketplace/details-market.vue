<template lang="pug">
#container(v-if="market")
  market-apply-form(
    v-if="!isEnrolled && !isAdmin && market && admin"
    :market="{...market, admin, owner}"
    :status="statusApplication"
    :participantsNumber="participants?.length"
    @submit="onSubmitApplyForm"
  )
  //- Tabs
  q-tabs.q-mt-lg(
    v-model="tab"
    v-if="isAdmin"
    :breakpoint="0"
    no-caps
    indicator-color="transparent"
    align="justify"
    active-class="active-tab"
  )
    q-tab(:ripple="false" name="market-info" :label="$t('pages.marketplace.tabs.marketInfo')")
    q-tab(:riple="false" name="enrollment" :label="$t('pages.marketplace.tabs.enrollmentRequest')")

  q-tab-panels(v-model="tab" keep-alive)
    q-tab-panel(name="market-info" v-if="isEnrolled || isAdmin" class="tabPanel")
      market-info-card(:market="{...market, admin, owner}" :participants="participants")
    q-tab-panel(name="enrollment" v-if="isAdmin" class="tabPanel")
      applicants-list(:applicants="applicants" :showActions="true" @onEnrollApplicant="enrollApplicant" @onRejectApplicant="rejectApplicant")
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import AccountItem from '~/components/common/account-item.vue'
import MarketInfoCard from '~/components/marketplace/details/market-info-card.vue'
import MarketApplyForm from '~/components/marketplace/details/market-apply-form.vue'
import ApplicantsList from '~/components/marketplace/applicants-list.vue'

export default {
  name: 'DetailsMarket',
  components: {
    AccountItem,
    MarketInfoCard,
    MarketApplyForm,
    ApplicantsList
  },
  data () {
    return {
      tab: 'market-info',
      marketId: undefined,
      market: undefined,
      application: undefined,
      participants: [],
      applicants: []
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount', 'isLoggedIn']),
    isEnrolled () {
      return !!this.participants?.find(participant => {
        return participant === this.selectedAccount.address
      })
    },
    statusApplication () {
      return this.application?.status || 'Not applied'
    },
    isAdmin () {
      const isAdmin = this.admin && this.selectedAccount.address === this.admin.address
      const isOwner = this.owner && this.selectedAccount.address === this.owner.address
      return isAdmin || isOwner
    },
    admin () {
      if (this.market && this.market.authorities) {
        return this.market.authorities.find(v => v.type === 'Admin')
      }
      return undefined
    },
    owner () {
      if (this.market && this.market.authorities) {
        return this.market.authorities.find(v => v.type === 'Owner')
      }
      return undefined
    }
  },
  watch: {
    selectedAccount () {
      if (this.tab === 'enrollment') {
        this.tab = 'market-info'
      }
      this.getMarketplaceInfo()
    }
  },
  async beforeMount () {
    this.syncParams()
    this.getMarketplaceInfo()
  },
  methods: {
    ...mapMutations('polkadotWallet', ['setIsLoggedIn']),
    syncParams () {
      const queries = this.$route.query
      if (queries && queries.marketId) {
        this.marketId = this.$route.query.marketId
      } else {
        this.$router.push({ name: 'marketplace' })
      }
    },
    async getMarketplaceInfo () {
      try {
        this.showLoading()
        const market = await this.$store.$marketplaceApi.getMarketplaceById({ marketId: this.marketId })
        const authorities = await this.$store.$marketplaceApi.getAuthoritiesByMarketplace({ marketId: this.marketId })
        const participants = await this.$store.$marketplaceApi.getParticipantsByMarket({ marketId: this.marketId })
        const applicants = await this.$store.$marketplaceApi.getApplicantsByMarket({ marketId: this.marketId })
        const applicantsHP = await this.getFromHP(applicants)
        console.log('App HP', applicantsHP)
        this.applicants = applicantsHP
        this.participants = participants
        await this.getApplication()
        this.market = market
        this.market.authorities = authorities
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async onSubmitApplyForm (form) {
      try {
        this.showLoading()
        if (form?.custodian) {
          form = await this.shareWithCustodian(form)
        }
        const { fields, custodianFields } = this.getStructureToSend(form)
        await this.$store.$marketplaceApi.applyFor({
          user: this.selectedAccount.address,
          marketId: this.marketId,
          fields,
          custodianFields: form?.custodian ? custodianFields : undefined
        })
        this.showNotification({ message: 'Application was submitted', color: 'primary' })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
        this.getMarketplaceInfo()
      }
    },
    async enrollApplicant (applicant) {
      console.log('enrollApplicant', applicant)
      try {
        this.showLoading()
        await this.$store.$marketplaceApi.enrollApplicant({
          user: this.selectedAccount.address,
          marketId: this.marketId,
          accountOrApplication: { Account: applicant.address },
          approved: true
        })
        this.showNotification({
          message: 'Application approved.',
          color: 'primary'
        })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
        this.getMarketplaceInfo()
      }
    },
    async rejectApplicant (applicant) {
      console.log('rejectApplicant', applicant)
      try {
        this.showLoading()
        await this.$store.$marketplaceApi.enrollApplicant({
          user: this.selectedAccount.address,
          marketId: this.marketId,
          accountOrApplication: { Account: applicant.address },
          approved: false
        })
        this.showNotification({
          message: 'Application rejected. ',
          color: 'primary'
        })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
        this.getMarketplaceInfo()
      }
    },
    async getApplication () {
      try {
        this.application = await this.$store.$marketplaceApi.getApplicationStatusByAccount({
          account: this.selectedAccount.address,
          marketId: this.marketId
        })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      }
    },
    async getFromHP (applicants) {
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
              ? privateFields.cid.split(':')[0]
              : privateFields.cid
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
            const cid = resolvedFields[_index]?.cid
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
    },
    async shareWithCustodian (form) {
      const { custodian, files, notes } = form
      const hpService = this.$store.$hashedPrivateApi
      const promisesFiles = []
      const promisesNotes = []
      try {
        files.forEach(file => {
          promisesFiles.push(hpService.shareExisting({
            toUserAddress: custodian,
            originalOwnedDataId: file.ownedId
          }))
        })
        const notesShared = hpService.shareExisting({
          toUserAddress: custodian,
          originalOwnedDataId: notes.ownedId
        })
        promisesNotes.push(notesShared)
        const resolvedFiles = await Promise.all(promisesFiles)
        const resolvedNotes = await Promise.all(promisesNotes)
        form.notes.custodianCid = resolvedNotes[0].cid
        delete form.notes.ownedId
        form.files = resolvedFiles.map((file, index) => {
          const fileName = form.files[index].cid.split(':')[1]
          const ownerAdminCid = form.files[index].cid
          const ownerCustodianCid = file.cid
          return {
            displayName: 'File:' + fileName,
            cid: ownerAdminCid,
            custodianCid: ownerCustodianCid + ':' + fileName
          }
        })
      } catch (error) {
        console.error('error', error)
        this.showNotification({ message: error.message || error, color: 'negative' })
      }
      return form || undefined
    },
    getStructureToSend (form) {
      const { files, notes, custodian } = form
      const filesToSend = files.map(file => {
        return [
          file.displayName,
          file.cid
        ]
      })
      filesToSend.push([
        notes.displayName,
        notes.cid
      ])
      const custodianFiles = files.map(file => {
        return file.custodianCid
      })
      custodianFiles.push(notes.custodianCid)
      const custodianFields = [
        custodian,
        custodianFiles
      ]
      return { fields: filesToSend, custodianFields }
    }
  }

}
</script>

<style lang="stylus" scoped>
@import '~/css/app.styl'
.tabPanel
  min-height: calc(80vh - 120px);
  background: $bg-body !important
  padding: 0px !important

.bottomLineTabs
  // border-bottom: 1px solid $color-secondary !important
</style>
