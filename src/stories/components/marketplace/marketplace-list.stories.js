/* eslint-disable no-useless-call */
import MarketplaceList from '../../../components/marketplace/marketplace-list'
import { action } from '@storybook/addon-actions'

export default {
  title: 'marketplace/MarketplaceList',
  component: MarketplaceList,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    selectedMarketplace: { action: action('selectedMarketplace') },
    onLoadMarkets: { action: action('onLoadMarkets') }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MarketplaceList },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  methods: {
    actionSelectedMarketplace (e) {
      action('selectedMarketplace').call(null, e)
    },
    actionOnLoadMarkets ({ index, done, stop }) {
      action('onLoadMarkets').call(null, { index, done, stop })
      stop()
    }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<MarketplaceList v-bind="args" @selectedMarketplace="actionSelectedMarketplace" @onLoadMarkets="actionOnLoadMarkets" />'
})

// Base component
export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Base.args = {
  marketplaces: [
    {
      id: '0x4ba56221415b8c3f90c655275f9c513cdd051354ba67f3a98dd3b97e7648b07c',
      value: {
        label: 'Victor marketplace'
      },
      owner: '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym',
      administrator: '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym'
    },
    {
      id: '0x70e3baf255617249b137e76074e234ad0ea4e3996209a17e0381cb7b9885439d',
      value: {
        label: 'Juan market'
      },
      owner: '5CmFmVadzNQFaeiyXXNugRXT1MuaoocUyogtYHEQeWjGp7pX',
      administrator: '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym'
    },
    {
      id: '0xc4ed08c3bfaffdc960132da99403dc96c10e3f311e393c0e4c32619ec8462f64',
      value: {
        label: 'Pedro market'
      },
      owner: '5CmFmVadzNQFaeiyXXNugRXT1MuaoocUyogtYHEQeWjGp7pX',
      administrator: '5CmFmVadzNQFaeiyXXNugRXT1MuaoocUyogtYHEQeWjGp7pX'
    },
    {
      id: '0xf912dc8693414512f349e0d968686171451e25bbea4ecb695a7776d4d30c66b5',
      value: {
        label: 'Alexis market'
      },
      owner: '5DaWmLfzBTLbKFwBC5YxtAQ45XMSAQCDLcZL6zW9ZiJsGSST',
      administrator: '5DaWmLfzBTLbKFwBC5YxtAQ45XMSAQCDLcZL6zW9ZiJsGSST'
    }
  ],
  emptyLabel: 'Empty list'
}
