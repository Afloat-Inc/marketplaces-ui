<template lang="pug">
#container
  .row.q-col-gutter-md(v-if="market")
    .col-8
      market-apply-form(
        v-if="!isEnrolled && !isAdmin"
        :market="{...market, admin}"
        @submit="onSubmitApplyForm"
      )
      //- Tabs
      q-tabs.q-mt-lg(
        v-model="tab"
        v-if="isAdmin"
        :breakpoint="0"
        no-caps
        align="justify"
        active-class="text-primary text-weight-bolder"
        class="bg-white text-grey-5"
      )
        q-tab(name="market-info" label="Market information")
        q-tab(name="enrollment" label="Enrollment requests")

      q-tab-panels(v-model="tab")
        q-tab-panel(name="market-info" v-if="isEnrolled || isAdmin")
          .row
            .col-12
              market-info-card(:market="{...market, admin}")
            .col-12
              .text-h6.q-pb-md {{$t('pages.marketplace.details.participantsTitle')}}
              .row.q-gutter-md
                account-item.no-shadow(
                  v-for="address in addresses"
                  :address="address.address"
                  bordered
                  shortDisplay
                )
        q-tab-panel(name="enrollment" v-if="isAdmin")
          applicants-list(:applicants="applicants" @onEnrollApplicant="enrollApplicant" @onRejectApplicant="rejectApplicant")
</template>

<script>
import { mapGetters } from 'vuex'
import AccountItem from '~/components/common/account-item.vue'
import MarketInfoCard from '~/components/marketplace/details/market-info-card.vue'
import MarketApplyForm from '~/components/marketplace/details/market-apply-form.vue'
import ApplicantsList from '~/components/marketplace/applicants-list.vue'
const afloatMarketplaceId = process.env.AFLOAT_MARKETPLACE_ID

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
      marketId: afloatMarketplaceId,
      market: undefined,
      participants: [],
      applicants: []
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount']),
    isEnrolled () {
      return !!this.participants.find(add => {
        return add.address === this.selectedAccount.address
      })
    },
    isAdmin () {
      return this.admin && this.selectedAccount.address === this.admin.address
    },
    admin () {
      if (this.market && this.market.authorities) {
        return this.market.authorities.find(v => v.type === 'Admin')
      }
      return undefined
    }
  },
  async beforeMount () {
    this.getMarketplaceInfo()
  },
  methods: {
    syncParams () {
      const queries = this.$route.query
      if (queries && queries.marketId) {
        this.idMarket = this.$route.query.marketId
      } else {
        this.$router.push({ name: 'marketplace' })
      }
    },
    async getMarketplaceInfo () {
      try {
        this.showLoading()
        this.market = await this.$store.$marketplaceApi.getMarketplaceById({ marketId: this.marketId })
        this.market.authorities = await this.$store.$marketplaceApi.getAuthoritiesByMarketplace({ marketId: this.marketId })
        this.participants = await this.$store.$marketplaceApi.getParticipantsByMarket({ marketId: this.marketId })
        this.applicants = await this.$store.$marketplaceApi.getApplicantsByMarket({ marketId: this.marketId })
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
        const response = await this.$store.$marketplaceApi.applyFor({
          user: this.selectedAccount.address,
          marketId: this.idMarket,
          notes: form.notes,
          files: form.files
        })
        this.showNotification({ message: response.message, color: 'positive' })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      }
    },
    async enrollApplicant (applicant) {
      console.log('enrollApplicant', applicant)
    },
    async rejectApplicant (applicant) {
      console.log('rejectApplicant', applicant)
    }
  }

}
</script>

<style lang="sass" scoped>

</style>
