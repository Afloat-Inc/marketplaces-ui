<template lang="pug">
#container
  .text-h6 Marketplace id {{$route.params.id}}
  .row.q-col-gutter-md
    .col-8
      MarketInfo(:market="market")
    .col-4
      .row.q-gutter-md
        AccountItem.no-shadow(v-for="address in addresses" :address="address.address" bordered)
</template>

<script>
import AccountItem from '~/components/common/account-item.vue'
import MarketInfo from '~/components/marketplace/details/market-info.vue'
export default {
  name: 'DetailsMarket',
  components: {
    AccountItem,
    MarketInfo
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
      idMarket: this.id || this.$route.params.id,
      addresses: [],
      market: {
        name: 'Michigan Credits',
        owner: '5FC6uhzDsa3Ycrkmu1MrUgsL9XhpgJYUe24fCtr1H8129fZi',
        taxCredits: ''
      }
    }
  },
  async beforeMount () {
    const response = await this.getAddresses()
    this.addresses = response
  },
  methods: {
    getAddresses () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            {
              address: '5DU84E1JYAhftyimxYd1MUaQ82GBKxNVFhDJSUSGU1ULpg1C'
            },
            {
              address: '5CZo4UL6tCS7jsXybRV1kzRZV9uKLy2yzCfQBmbQLx1x4Nce'
            },
            {
              address: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
            }
          ])
        }, 1000)
      })
    }
  }

}
</script>

<style lang="sass" scoped>

</style>
