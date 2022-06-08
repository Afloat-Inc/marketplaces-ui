<template lang="pug">
#container
  .row.q-col-gutter-md.q-py-md
    .col-12
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
        q-tab(name="market-info" label="Market informmation")
        q-tab(name="enrollment" label="Enrollment requests")

      q-tab-panels(v-model="tab")
        q-tab-panel(name="market-info" v-if="isEnrolled || isAdmin")
          .row
            .col-12
              market-info-card(:market="market")
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
          enrollment
</template>

<script>
import { mapGetters } from 'vuex'
import AccountItem from '~/components/common/account-item.vue'
import MarketInfoCard from '~/components/marketplace/details/market-info-card.vue'
import MarketApplyForm from '~/components/marketplace/details/market-apply-form.vue'
import Enrollment from '~/pages/marketplace/enrollment.vue'
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
      allMarketplaces: undefined,
      idMarket: undefined,
      addresses: [],
      market: {
        label: undefined,
        administrator: undefined,
        taxCredits: undefined
      }
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount']),
    isEnrolled () {
      return !!this.addresses.find(add => {
        return add.address === this.selectedAccount.address
      })
    },
    isAdmin () {
      return this.selectedAccount.address === this.market.administrator
    }

  },
  async beforeMount () {
    this.syncParams()
    await this.getAllMarketplace()
    this.market = this.getMarketplaceInfo()
    const response = await this.getAddresses()
    this.addresses = response
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
    getMarketplaceInfo () {
      return this.allMarketplaces.find(market => {
        return market.id === this.idMarket
      })
    },
    async getAllMarketplace () {
      try {
        this.allMarketplaces = await this.$store.$marketplaceApi.getAllMarketplaces()
        console.log('allMarketplaces', this.allMarketplaces)
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      }
    },
    async getAddresses () {
      return await this.$store.$marketplaceApi.getParticipantsByMarket({ marketId: this.idMarket })
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
