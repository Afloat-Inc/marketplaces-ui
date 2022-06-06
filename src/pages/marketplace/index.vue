<template lang="pug">
#container
  //- Header
  .row.justify-between.items-center
    .text-h6 Marketplace
    q-btn(
      label="Add Marketplace"
      no-caps
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
      marketplace-list(:marketplaces="myMarketplaces" emptyLabel="You don't have marketplaces yet" @selectedMarketplace="onSelectMarketplace")
    q-tab-panel(name="allMarketplaces")
      marketplace-list(:marketplaces="allMarketplaces" emptyLabel="Marketplaces have not yet been created" @selectedMarketplace="onSelectMarketplace")
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
      }
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount'])
  },
  mounted () {
    this.getAllMarketplace()
  },
  methods: {
    getAllMarketplace () {
      this.allMarketplaces = [
        {
          id: '0',
          label: "Chema's marketplace",
          administrator: '5CmFmVadzNQFaeiyXXNugRXT1MuaoocUyogtYHEQeWjGp7pX'
        },
        {
          id: '1',
          label: "Abel's marketplace",
          administrator: '5DaWmLfzBTLbKFwBC5YxtAQ45XMSAQCDLcZL6zW9ZiJsGSST'
        },
        {
          id: '2',
          label: "Erick's marketplace",
          administrator: '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym'
        }
      ]
    },
    createMarketplace (marketplace) {
      try {
        this.showLoading()
        console.log('createMarketplace', marketplace)
        this.modals.isShowingAddMarketplace = false
        this.myMarketplaces.push({
          ...marketplace,
          id: this.myMarketplaces.length.toString(),
          administrator: this.selectedAccount.address
        })
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
        name: 'marketplace-enrollment',
        // params: marketplace,
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
