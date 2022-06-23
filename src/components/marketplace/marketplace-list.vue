<template lang="pug">
#container
  #no-items(v-if="!haveMarketplaces")
    .text-body2 {{ emptyLabel }}
  #items(v-else)
    .row.justify-center
      t-input(
        testid="label_input"
        label="Search"
        v-model="search"
        placeholder="Please write a keyword"
        autofocus
      )
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
          .col-3(v-for="marketplace in resultSearch" :key="marketplace.key")
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
    },
    /**
     * This props is used to know if the tab is the my marketplaces or the all marketplaces
     * My marketplaces doesn't have pagination yet
     */
    type: {
      type: String,
      default: undefined
    }
  },
  emits: ['selectedMarketplace', 'onLoadMarkets'],
  data () {
    return {
      search: '',
      resultSearch: []
    }
  },
  computed: {
    haveMarketplaces () {
      return (this.marketplaces && this.marketplaces.length > 0)
    }
  },
  watch: {
    search (value) {
      if (value !== '') {
        this.onSearch()
      } else {
        this.resultSearch = this.marketplaces
      }
    },
    marketplaces () {
      this.resultSearch = this.marketplaces
    }
  },
  mounted () {
    this.resultSearch = this.marketplaces
  },
  methods: {
    selectMarketplace (marketplace) {
      this.$emit('selectedMarketplace', marketplace)
    },
    loadMoreMarkets (index, done) {
      const stop = this.$refs.infiniteScroll.stop
      if (this.type === 'my-marketplaces') {
        done()
        return
      }
      this.$emit('onLoadMarkets', { index, done, stop })
    },
    onSearch () {
      const currentSearch = this.search.toLowerCase()
      this.resultSearch = this.marketplaces.filter(item => item.value.label.toLowerCase().includes(currentSearch))
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
