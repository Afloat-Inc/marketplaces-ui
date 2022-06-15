/* eslint-disable no-useless-call */
import FileItem from '../../../components/common/file/file-item'
// import { expect } from '@storybook/jest'
// import { userEvent, within } from '@storybook/testing-library'
export default {
  title: 'common/FileItem',
  component: FileItem,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { FileItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  data () {
    return {
      loading: false
    }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<QCard><FileItem v-bind="args"/></QCard>'
})

// Base component
export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Base.args = {
  cid: 'Qmdk3gwwrfoWif9zJ3YTahH7fGq3JgqDBR3G2kqvbAqCro:pdf:Lorem_ipsum.pdf',
  displayName: 'file.pdf'
}
