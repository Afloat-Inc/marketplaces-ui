<template lang="pug">
#container
  #no-items(v-if="!haveMarketplaces")
    .text-body2 {{ emptyLabel }}
  #items(v-else)
    #scroll-area(ref="scrollTargetRef" class="q-pa-md")
      q-infinite-scroll(
        :offset="100"
        @load="loadMoreMarkets"
        :scroll-target="$refs.scrollTargetRef"
        ref="infiniteScroll"
      )
        template(v-slot:loading)
          .row.justify-center.q-my-md
            q-spinner-dots(color="primary" size="40px")
        .row.q-col-gutter-md
          .col-3(v-for="marketplace in marketplaces" :key="marketplace.key")
            marketplace-item(:marketplace="marketplace" @onClick="selectMarketplace")
</template>

<script>
import MarketplaceItem from '~/components/marketplace/marketplace-item'
/**
 * This component handler the states for marketplace list
 */
export default {
  name: 'MarketplaceList',
  components: { MarketplaceItem },
  props: {
    /**
     * List of marketplace to show
     */
    marketplaces: {
      type: Array,
      default: () => []
    },
    /**
     * String to custom label when the list is empty
     */
    emptyLabel: {
      type: String,
      default: 'There are not marketplaces yet'
    }
  },
  emits: ['selectedMarketplace', 'loadMarkets'],
  computed: {
    haveMarketplaces () {
      return (this.marketplaces && this.marketplaces.length > 0)
    }
  },
  methods: {
    selectMarketplace (marketplace) {
      this.$emit('selectedMarketplace', marketplace)
    },
    loadMoreMarkets (index, done) {
      const stop = this.$refs.infiniteScroll.stop
      this.$emit('loadMarkets', { index, done, stop })
    }
  }
}
</script>
<style lang="stylus" scoped>
#container
  min-height: 35vh
#scroll-area
    height: calc(75vh - 120px)
    overflow-x: hidden
</style>
