<template lang="pug">
#container
  .row.q-col-gutter-md(v-if="market")
    .col-8
      market-apply-form(
        v-if="!isEnrolled && !isAdmin"
        :market="market"
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
          market-info-card(:market="market")
        q-tab-panel(name="enrollment" v-if="isAdmin")
          enrollment(:applicants="applicants")
    .col-4
      .text-h6 {{$t('pages.marketplace.details.participantsTitle')}}
      .row.q-gutter-md
        account-item.no-shadow(
          v-for="participant in participants"
          :address="participant.address"
          bordered
          shortDisplay
        )
</template>

<script>
import { mapGetters } from 'vuex'
import AccountItem from '~/components/common/account-item.vue'
import MarketInfoCard from '~/components/marketplace/details/market-info-card.vue'
import MarketApplyForm from '~/components/marketplace/details/market-apply-form.vue'
import Enrollment from '~/pages/marketplace/enrollment.vue'
const afloatMarketplaceId = process.env.AFLOAT_MARKETPLACE_ID

export default {
  name: 'DetailsMarket',
  components: {
    AccountItem,
    MarketInfoCard,
    MarketApplyForm,
    Enrollment
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
      return this.market && this.selectedAccount.address === this.market.administrator
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
        const response = await this.$store.$marketplaceApi.applyForMarket({
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
    }
  }

}
</script>

<style lang="sass" scoped>

</style>
