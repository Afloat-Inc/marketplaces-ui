<template lang="pug">
#container
  //- Header
  .row.justify-between.items-center
    .text-h6 Marketplace
    q-btn(
      label="Add Marketplace"
      no-caps
      unelevated
      color="primary"
      rounded
      @click="modals.isShowingAddMarketplace = true"
    )
  //- Tabs
  q-tabs.q-mt-lg(
    v-model="tab"
    :breakpoint="0"
    no-caps
    align="justify"
    active-class="text-primary text-weight-bolder"
    class="bg-white text-grey-5"
  )
    q-tab(name="myMarketplaces" label="My marketplaces")
    q-tab(name="allMarketplaces" label="All marketplaces")

  q-tab-panels(v-model="tab" animated)
    q-tab-panel(name="myMarketplaces")
      marketplace-list(:marketplaces="myMarketplaces" emptyLabel="You don't have marketplaces yet" @selectedMarketplace="onSelectMarketplace" @onLoadMarkets="onLoadMyMarketplaces")
    q-tab-panel(name="allMarketplaces")
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
      this.$forceUpdate()
    }
  },
  mounted () {
    // this.getAllMarketplace()
    this.getMyMarketplaces()
  },
  methods: {
    async onLoadMoreMarkets ({ index, done, stop }) {
      const lastMarketplace = this.allMarketplaces[this.allMarketplaces.length - 1]
      const loadedMoreMarkets = await this.$store.$marketplaceApi.getAllMarketplaces({ startKey: lastMarketplace.key, pageSize: this.pagination.limit })
      this.allMarketplaces = this.allMarketplaces.concat(loadedMoreMarkets)
      this.getMyMarketplaces()
      if (loadedMoreMarkets.length > 0) done()
      else stop()
    },
    async onLoadMyMarketplaces ({ index, done, stop }) {
      // const lastMarketplace = this.myMarketplaces[this.myMarketplaces.length - 1]
      // const loadedMyMarketplaces = await this.$store.$marketplaceApi.getMyMarketplaces({ startKey: lastMarketplace.key, pageSize: this.pagination.limit })
      // this.myMarketplaces = this.myMarketplaces.concat(loadedMyMarketplaces)
      // if (loadedMyMarketplaces.length > 0) done()
      // else stop()
      // done()
    },
    async getAllMarketplace () {
      this.allMarketplaces = await this.$store.$marketplaceApi.getAllMarketplaces({ startKey: 0, pageSize: this.pagination.limit })
    },
    async getMyMarketplaces () {
      this.myMarketplaces = await this.$store.$marketplaceApi.getMyMarketplaces({ accountId: this.selectedAccount.address })
      console.log(this.myMarketplaces)
      // this.myMarketplaces = this.allMarketplaces.filter(marketplace => marketplace.owner === this.selectedAccount.address)
      // this.allMarketplaces = this.allMarketplaces.filter(marketplace => marketplace.owner !== this.selectedAccount.address)
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
    }
  }
}
</script>

<style lang="sass" scoped>
.activeTab
  border-radius: 10px 10px 0px 0px
.normalTab
  border-radius: 10px 10px 0px 0px
</style>
