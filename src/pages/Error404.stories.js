import NotFound from './Error404.vue'

export default {
  title: 'Example/ Not Found',
  component: NotFound
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { NotFound },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { ...args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<NotFound/>'
})

export const Base = Template.bind({})
Base.args = {
}
