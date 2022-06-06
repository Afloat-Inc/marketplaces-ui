<template lang="pug">
#container
  .text-h6 Marketplace
  Tinput(label="lorem")
  IpfsMultiInput(v-model="files")
  div(v-for="market in markets" @click="selectMarket(market)")
    .text-h6
      | {{market.name}}
</template>

<script>
import Tinput from '~/components/common/input/t-input.vue'
import IpfsMultiInput from '~/components/common/ipfs/ipfs-multi-input.vue'
export default {
  name: 'Marketplace',
  components: {
    Tinput,
    IpfsMultiInput
  },
  data () {
    return {
      keyToEncrypt: '',
      files: undefined,
      markets: [
        {
          id: 1,
          name: 'market1',
          price: '0.1',
          description: 'lorem ipsum'
        },
        {
          id: 2,
          name: 'market2',
          price: '0.2',
          description: 'lorem ipsum'
        },
        {
          id: 3,
          name: 'market3',
          price: '0.3',
          description: 'lorem ipsum'
        }
      ]
    }
  },
  methods: {
    selectMarket (market) {
      this.$router.push({ name: 'marketplace-detail', params: { id: market.id } })
    }
  }
}
</script>
