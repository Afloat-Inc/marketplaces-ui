<template lang="pug">
#container
  .text-h6 Marketplace id {{$route.params.id}} {{'Enrolled: '+ !!isEnrolled}}{{' Admin: '+!!isAdmin}}
  .row.q-col-gutter-md()
    .col-8
      market-apply(v-if="!isEnrolled && !isAdmin " :market="market")
      market-info(v-if="isEnrolled && !isAdmin" :market="market")
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
            market-info(:market="market")
          q-tab-panel(name="enrollment")
            | Enrollment requests
    .col-4
      .row.q-gutter-md
        account-item.no-shadow(v-for="address in addresses" :address="address.address" bordered)
</template>

<script>
import { mapGetters } from 'vuex'
import AccountItem from '~/components/common/account-item.vue'
import MarketInfo from '~/components/marketplace/details/market-info.vue'
import MarketApply from '~/components/marketplace/details/market-apply.vue'
export default {
  name: 'DetailsMarket',
  components: {
    AccountItem,
    MarketInfo,
    MarketApply
  },
  props: {
    id: {
      type: Number,
      required: true,
      default: undefined
    }
  },
  data () {
    return {
      tab: 'market-info',
      idMarket: this.id || this.$route.params.id,
      addresses: [],
      market: {
        label: undefined,
        administrator: undefined,
        taxCredits: undefined
      }
    }
  },
  computed: {
    ...mapGetters('marketplace', ['getMarketplaceInfo']),
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
    this.market = this.getMarketplaceInfo
    const response = await this.getAddresses()
    this.addresses = response
  },
  methods: {
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
    }
  }

}
</script>

<style lang="sass" scoped>

</style>
