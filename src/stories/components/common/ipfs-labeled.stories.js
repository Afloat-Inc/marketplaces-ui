/* eslint-disable no-useless-call */
import IpfsLabeled from '../../../components/common/ipfs/ipfs-labeled'
// import { expect } from '@storybook/jest'
// import { userEvent, within } from '@storybook/testing-library'
import { userEvent, within } from '@storybook/testing-library'
import image from '../../assets/colors.svg'
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
  rules: [val => !!val || 'Required'],
  filled: false,
  readonly: false

}

export const FilledExample = Template.bind({
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
FilledExample.args = {
  label: 'lorem ipsum',
  modelValue: {
  },
  rules: [val => !!val || 'Required'],
  filled: false,
  readonly: false
}
FilledExample.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.type(canvas.getByTestId('name_file'), 'This file contains my reason for applying')
  const file = new File([image], 'colors.svg', { type: 'image/svg+xml' })
  await userEvent.upload(canvas.getByTestId('qFile'), file)
}
