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
    .row.q-col-gutter-md
      .col-3(v-for="marketplace in resultSearch")
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
  emits: ['selectedMarketplace'],
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
    }
  },
  mounted () {
    this.resultSearch = this.marketplaces
  },
  methods: {
    selectMarketplace (marketplace) {
      this.$emit('selectedMarketplace', marketplace)
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
</style>
