/* eslint-disable no-useless-call */
import IpfsLabeled from '../../../components/common/ipfs/ipfs-labeled'
export default {
  title: 'common/ipfs-labeled',
  component: IpfsLabeled,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { IpfsLabeled },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  data () {
    return {
      loading: false,
      initWithString: false,
      typeCid: null,
      files: [],
      displayNames: undefined,
      tagFile: undefined,
      labelFile: undefined
    }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<IpfsLabeled v-bind="args"/>'
})

// Base component
export const Base = Template.bind({
  data () {
    return {
      loading: false,
      initWithString: false,
      typeCid: null,
      files: [],
      displayNames: undefined,
      tagFile: undefined,
      labelFile: undefined
    }
  }

})

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Base.args = {
  label: 'lorem ipsum',
  modelValue: {

  },
  mcallback: () => {
  },
  rules: [],
  type: 'text',
  standout: '',
  prefix: '',
  suffix: '',
  hint: 'hint text',
  filled: false,
  readonly: false

}
