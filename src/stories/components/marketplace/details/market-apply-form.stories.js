/* eslint-disable no-useless-call */
import MarketApplyForm from '../../../../components/marketplace/details/market-apply-form'
import { action } from '@storybook/addon-actions'
// import { expect } from '@storybook/jest'
// import { userEvent, within } from '@storybook/testing-library'
// import { userEvent, waitFor, within } from '@storybook/testing-library'

export default {
  title: 'Marketplace/MarketApplyForm',
  component: MarketApplyForm,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    submit: { action: action('submit') }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MarketApplyForm },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  data () {
    return {
      form: {
        notes: undefined,
        files: undefined
      },
      marketInfo: {
        owner: '',
        taxCredits: ''
      }
    }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<MarketApplyForm v-bind="args" @submit="onSubmitApplyForm"/>',
  methods: {
    onSubmitApplyForm (e) {
      action('submit').call(null, e)
      this.data = e
      console.log('data', this.data)
    }
  }
})

// Base component
export const Base = Template.bind({
  data () {
    return {
      form: {
        notes: undefined,
        files: undefined
      },
      marketInfo: {
        owner: '',
        taxCredits: ''
      }
    }
  }
})

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Base.args = {
  market: {
    id: '1',
    label: "Abel's marketplace",
    administrator: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
  }
}
