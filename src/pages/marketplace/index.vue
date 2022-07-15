<template lang="pug">
#container
  //- Header
  .row.justify-between.items-center
    .text-h5 {{ $t('pages.marketplace.marketplaceTitle') }}
    q-btn(
      :label="$t('pages.marketplace.addMarketplaceButton')"
      no-caps
      unelevated
      color="secondary"
      outline
      @click="onAddMarketplace"
    )
  //- Tabs
  q-tabs.q-mt-lg(
    v-model="tab"
    :breakpoint="0"
    no-caps
    indicator-color="transparent"
    align="justify"
    active-class="active-tab"
  )
    q-tab(name="myMarketplaces" :label="$t('pages.marketplace.tabs.myMarketplaces')")
    q-tab(name="allMarketplaces" :label="$t('pages.marketplace.tabs.allMarketplaces')")

  q-tab-panels(v-model="tab")
    q-tab-panel(name="myMarketplaces" class="tabPanel")
      marketplace-list(:type="'my-marketplaces'" :marketplaces="myMarketplaces" emptyLabel="You don't have marketplaces yet" @selectedMarketplace="onSelectMarketplace")
    q-tab-panel(name="allMarketplaces" class="tabPanel")
      marketplace-list(:marketplaces="allMarketplaces" emptyLabel="Marketplaces have not yet been created" @selectedMarketplace="onSelectMarketplace" @onLoadMarkets="onLoadMoreMarkets")
  #modals
    q-dialog(v-model="modals.isShowingAddMarketplace" persistent)
      q-card.modalSize
        create-marketplace-form(@submittedForm="createMarketplace")
</template>

<script>
import TInput from '~/components/common/input/t-input.vue'
import CreateMarketplaceForm from '~/components/marketplace/create-marketplace-form'
import MarketplaceList from '~/components/marketplace/marketplace-list'
import { mapGetters } from 'vuex'

export default {
  name: 'Marketplace',
  components: {
    TInput,
    CreateMarketplaceForm,
    MarketplaceList
  },
  data () {
    return {
      tab: 'myMarketplaces',
      myMarketplaces: [],
      allMarketplaces: [],
      modals: {
        isShowingAddMarketplace: false
      },
      pagination: {
        limit: 10
      }
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount'])
  },
  watch: {
    selectedAccount (account) {
      this.getAllMarketplace()
      this.getMyMarketplaces()
    }
  },
  mounted () {
    this.getAllMarketplace()
    this.getMyMarketplaces()
  },
  methods: {
    async onLoadMoreMarkets ({ index, done, stop }) {
      const lastMarketplace = this.allMarketplaces[this.allMarketplaces.length - 1]
      const loadedMoreMarkets = await this.$store.$marketplaceApi.getAllMarketplaces({ startKey: lastMarketplace.key, pageSize: this.pagination.limit })
      this.allMarketplaces = this.allMarketplaces.concat(loadedMoreMarkets)
      if (loadedMoreMarkets.length > 0) done()
      else stop()
    },
    async getAllMarketplace () {
      try {
        this.showLoading()
        this.allMarketplaces = await this.$store.$marketplaceApi.getAllMarketplaces({ startKey: 0, pageSize: this.pagination.limit })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async getMyMarketplaces () {
      try {
        this.showLoading()
        this.myMarketplaces = await this.$store.$marketplaceApi.getMyMarketplaces({ accountId: this.selectedAccount.address })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async createMarketplace (marketplace) {
      try {
        this.showLoading()
        console.log('createMarketplace', marketplace)
        this.modals.isShowingAddMarketplace = false
        await this.$store.$marketplaceApi.createMarketplace({
          admin: this.selectedAccount.address,
          user: this.selectedAccount.address,
          label: marketplace.label
        })
        this.getMyMarketplaces()
        this.getAllMarketplace()
        if (this.tab !== 'myMarketplaces') {
          this.tab = 'myMarketplaces'
        }
        this.showNotification({ message: 'Marketplace created successfully' })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    onSelectMarketplace (marketplace) {
      console.log('onSelectMarketplace', marketplace)
      this.$router.push({
        name: 'marketplace-details',
        query: { marketId: marketplace.id }
      })
    },
    async onAddMarketplace () {
      const isLoggedIn = await this.$store.$hashedPrivateApi.isLoggedIn()
      if (isLoggedIn) {
        this.modals.isShowingAddMarketplace = true
      } else {
        this.showNotification({ message: 'You must be logged in to create a marketplace', color: 'negative' })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~/css/app.styl'
.activeTab
  border-radius: 10px 10px 0px 0px
.normalTab
  border-radius: 10px 10px 0px 0px
.tabPanel
  padding: 1rem 0rem 0rem 0rem
  background-color: $bg-body
</style>
