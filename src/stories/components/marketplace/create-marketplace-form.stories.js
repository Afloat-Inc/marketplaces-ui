import CreateMarketplaceForm from '../../../components/marketplace/create-marketplace-form.vue'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Marketplace/CreateMarketplaceForm',
  component: CreateMarketplaceForm,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CreateMarketplaceForm },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<CreateMarketplaceForm v-bind="args" @submittedForm="submitAction"/>',
  methods: {
    submitAction (e) {
      console.log('submitAction', e)
      action('click')
    }
  }
})

export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Base.args = {
  // primary: true,
  // label: 'Button'
}
