/* eslint-disable no-useless-call */
import MarketInfoCard from '../../../../components/marketplace/details/market-info-card'
import { action } from '@storybook/addon-actions'
// import { expect } from '@storybook/jest'
// import { userEvent, within } from '@storybook/testing-library'
// import { userEvent, waitFor, within } from '@storybook/testing-library'

export default {
  title: 'Marketplace/MarketInfoCard',
  component: MarketInfoCard,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    submittedForm: { action: action('submittedForm') }
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
        owner: '',
        taxCredits: [
          {
            state: 'Michigan',
            taxCredits: 'lorem',
            amount: '500.30'
          }
        ]
      }
    }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<MarketInfoCard v-bind="args" @submittedForm="submitAction"/>',
  methods: {
    submitAction (e) {
      action('submittedForm').call(null, e)
      this.data = e
      console.log('data', this.data)
    }
  }
})

// Base component
export const Base = Template.bind({})

// Success Submitted
export const SuccessSubmitted = Template.bind({
  data () {
    return {
      data: 'Testing'
    }
  }
})
// SuccessSubmitted.play = async ({ args, canvasElement }) => {
//   const canvas = within(canvasElement)

//   await userEvent.type(canvas.getByTestId('label_input'), 'This is a description')

//   await userEvent.click(canvas.getByTestId('submit_btn'))
//   // console.log('args', args)
//   // const spy = spyOn(CreateMarketplaceForm, 'submittedForm')

//   // await waitFor(() => expect(args).toHaveBeenCalled())
// }

// Failed Submitted
// export const FailedSubmitted = Template.bind({})
// FailedSubmitted.play = async ({ args, canvasElement }) => {
//   const canvas = within(canvasElement)

//   await userEvent.type(canvas.getByTestId('label_input'), undefined)

//   await userEvent.click(canvas.getByTestId('submit_btn'))
//   // console.log('args', args)
//   // const spy = spyOn(CreateMarketplaceForm, 'submittedForm')

//   // await waitFor(() => expect(args).toHaveBeenCalled())
// }

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
SuccessSubmitted.args = {
  market: {
    id: '1',
    label: "Abel's marketplace",
    administrator: '5DaWmLfzBTLbKFwBC5YxtAQ45XMSAQCDLcZL6zW9ZiJsGSST'
  }
  // primary: true,
  // label: 'Button'
}

// SuccessSubmitted.data({
//   data: 'test'
// })
