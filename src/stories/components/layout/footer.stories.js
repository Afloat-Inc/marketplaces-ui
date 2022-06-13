/* eslint-disable no-useless-call */
import Footer from '../../../components/footer/custom-footer'
// import { expect } from '@storybook/jest'
// import { userEvent, within } from '@storybook/testing-library'
export default {
  title: 'Layout/Footer',
  component: Footer,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Footer },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<QCard><Footer v-bind="args"/></QCard>'
})

// Base component
export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Base.args = {}
