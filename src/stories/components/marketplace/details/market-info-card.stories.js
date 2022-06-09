/* eslint-disable no-useless-call */
import MarketInfoCard from '../../../../components/marketplace/details/market-info-card'
export default {
  title: 'Marketplace/MarketInfoCard',
  component: MarketInfoCard,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MarketInfoCard },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  data () {
    return {
      marketInfo: {
        owner: undefined,
        admin: undefined,
        appraiser: undefined,
        label: undefined
      }
    }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<MarketInfoCard v-bind="args"/>'
})

// Base component
export const Base = Template.bind({
  data () {
    return {
      marketInfo: {
        owner: undefined,
        admin: undefined,
        appraiser: undefined,
        label: undefined
      }
    }
  }

})

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Base.args = {
  market: {
    id: '1',
    label: "Abel's marketplace",
    administrator: '5DaWmLfzBTLbKFwBC5YxtAQ45XMSAQCDLcZL6zW9ZiJsGSST'
  },
  participants: [
    {
      address: '5DaWmLfzBTLbKFwBC5YxtAQ45XMSAQCDLcZL6zW9ZiJsGSST'
    },
    {
      address: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
    }
  ]

}
