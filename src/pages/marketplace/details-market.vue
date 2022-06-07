<template lang="pug">
#container
  .row.q-col-gutter-md()
    .col-8
      market-apply-form(
        v-if="!isEnrolled && !isAdmin "
        :market="market"
        @submit="onSubmitApplyForm"
      )
      market-info-card(v-if="isEnrolled && !isAdmin" :market="market")
      .container(v-if="isEnrolled && isAdmin")
        //- Tabs
        q-tabs.q-mt-lg(
          v-model="tab"
          :breakpoint="0"
          no-caps
          align="justify"
          active-class="text-primary text-weight-bolder"
          class="bg-white text-grey-5"
        )
          q-tab(name="market-info" label="Market informmation")
          q-tab(name="enrollment" label="Enrollment requests")

        q-tab-panels(v-model="tab")
          q-tab-panel(name="market-info")
            market-info-card(:market="market")
          q-tab-panel(name="enrollment")
            Enrollment()
    .col-4
      .row.q-gutter-md
        account-item.no-shadow(v-for="address in addresses" :address="address.address" bordered)
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
      return this.addresses.find(add => {
        return add.address === this.selectedAccount.address
      })
    },
    isAdmin () {
      return this.selectedAccount.address === this.market.administrator
    }

  },
  async beforeMount () {
    this.syncParams()
    this.getAllMarketplace()
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
        },
        {
          id: '3',
          label: "Alejandro's marketplace",
          administrator: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
        }
      ]
    },
    getAddresses () {
      return [
        {
          address: '5DU84E1JYAhftyimxYd1MUaQ82GBKxNVFhDJSUSGU1ULpg1C'
        },
        {
          address: '5CZo4UL6tCS7jsXybRV1kzRZV9uKLy2yzCfQBmbQLx1x4Nce'
        },
        {
          address: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
        }
      ]
    },
    onSubmitApplyForm (form) {
      console.log('form to apply: ', form)
    }
  }

}
</script>

<style lang="sass" scoped>

</style>
