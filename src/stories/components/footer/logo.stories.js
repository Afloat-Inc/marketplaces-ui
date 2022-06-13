/* eslint-disable no-useless-call */
import Logo from '../../../components/common/logo'

export default {
  title: 'common/logo',
  component: Logo,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Logo },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<Logo v-bind="args"/>'
})

// Base component
export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Base.args = {
  includeSubtitle: false
}

export const WithSubtitle = Template.bind({})

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
WithSubtitle.args = {
  includeSubtitle: true
}
