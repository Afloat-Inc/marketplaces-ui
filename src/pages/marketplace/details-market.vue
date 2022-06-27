<template lang="pug">
#container
  .row.q-col-gutter-md(v-if="market")
    .col-12
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
        indicator-color="white"
        align="justify"
        class="bottomLineTabs"
        active-class="active-tab"
      )
        q-tab(:ripple="false" name="market-info" label="Market information")
        q-tab(:riple="false" name="enrollment" label="Enrollment requests")

      q-tab-panels(v-model="tab" keep-alive)
        q-tab-panel(name="market-info" v-if="isEnrolled || isAdmin" class="tabPanel")
          .row
            .col-12
              market-info-card(:market="{...market, admin, owner}" :participants="participants")
        q-tab-panel(name="enrollment" v-if="isAdmin" class="tabPanel")
          applicants-list(:applicants="applicants" @onEnrollApplicant="enrollApplicant" @onRejectApplicant="rejectApplicant")
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters('polkadotWallet', ['selectedAccount']),
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
        this.applicants = applicants
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
      console.log('form to apply: ', form)
      try {
        this.showLoading()
        await this.$store.$marketplaceApi.applyFor({
          user: this.selectedAccount.address,
          marketId: this.marketId,
          notes: form.notes,
          files: form.files
        })
        this.showNotification({ message: 'Application was submitted', color: 'positive' })
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
          color: 'positive'
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
          color: 'positive'
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
    }
  }

}
</script>

<style lang="stylus" scoped>
@import '~/css/app.styl'
.tabPanel
  min-height: calc(80vh - 120px);

.bottomLineTabs
  // border-bottom: 1px solid $color-secondary !important
</style>
