/* eslint-disable no-useless-call */
import MarketplaceItem from '../../../components/marketplace/marketplace-item'
import { action } from '@storybook/addon-actions'

export default {
  title: 'marketplace/MarketplaceItem',
  component: MarketplaceItem,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    onClick: { action: action('onClick') }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MarketplaceItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  methods: {
    showMarketplace (e) {
      action('onClick').call(null, e)
    }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<MarketplaceItem v-bind="args" @onClick="showMarketplace" />'
})

// Base component
export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Base.args = {
  marketplace: {
    id: '0xd8672219a57eb2d3f4d2651c75127cedcb457a6bc7c3cbe1d92019995503358b',
    value: {
      label: 'Alexis marketplace'
    },
    owner: 'Test owner',
    administrator: 'Test admin'
  }
}
