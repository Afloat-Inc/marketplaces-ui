<template lang="pug">
#container
  #no-items(v-if="!haveMarketplaces")
    .text-body2 {{ emptyLabel }}
  #items(v-else)
    .row.q-col-gutter-md
      .col-3(v-for="marketplace in marketplaces")
        marketplace-item(v-bind="marketplace" @onClick="selectMarketplace")
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
  computed: {
    haveMarketplaces () {
      return (this.marketplaces && this.marketplaces.length > 0)
    }
  },
  methods: {
    selectMarketplace (marketplace) {
      this.$emit('selectedMarketplace', marketplace)
    }
  }
}
</script>
