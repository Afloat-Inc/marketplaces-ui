/* eslint-disable no-useless-call */
import ApplicantExpanderItem from '../../../components/marketplace/applicant-expander-item'
import { action } from '@storybook/addon-actions'
// import { expect } from '@storybook/jest'
// import { userEvent, within } from '@storybook/testing-library'
// import { userEvent, within } from '@storybook/testing-library'
// import image from '../../assets/colors.svg'
export default {
  title: 'Marketplace/ApplicantExpanderItem',
  component: ApplicantExpanderItem,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    enroll: { action: action('enroll') },
    reject: { action: action('reject') }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ApplicantExpanderItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  methods: {
    enroll (e) {
      action('onEnroll').call(null, e)
      this.data = e
      console.log('data', this.data)
    },
    reject (e) {
      action('onReject').call(null, e)
      this.data = e
      console.log('data', this.data)
    }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<ApplicantExpanderItem v-bind="args" @onEnroll="enroll" @onReject="reject"/>'
})

// Base component
export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Base.args = {
  id: '1',
  address: '5CmFmVadzNQFaeiyXXNugRXT1MuaoocUyogtYHEQeWjGp7pX',
  notes: 'lorem ipsum',
  files: [
    {
      displayName: 'colors.svg',
      cid: 'Qmdk3gwwrfoWif9zJ3YTahH7fGq3JgqDBR3G2kqvbAqCro:pdf:Lorem_ipsum.pdf'
    },
    {
      displayName: 'file.pdf',
      cid: 'Qmdk3gwwrfoWif9zJ3YTahH7fGq3JgqDBR3G2kqvbAqCro:pdf:Lorem_ipsum.pdf'
    }
  ],
  status: 'Pending'
}
// Base component
export const PendingApplication = Template.bind({})

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
PendingApplication.args = {
  id: '1',
  address: '5CmFmVadzNQFaeiyXXNugRXT1MuaoocUyogtYHEQeWjGp7pX',
  notes: 'lorem ipsum',
  files: [
    {
      displayName: 'colors.svg',
      cid: 'Qmdk3gwwrfoWif9zJ3YTahH7fGq3JgqDBR3G2kqvbAqCro:pdf:Lorem_ipsum.pdf'
    },
    {
      displayName: 'file.pdf',
      cid: 'Qmdk3gwwrfoWif9zJ3YTahH7fGq3JgqDBR3G2kqvbAqCro:pdf:Lorem_ipsum.pdf'
    }
  ],
  status: 'Pending'
}
// Base component
export const RejectedApplication = Template.bind({})

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
RejectedApplication.args = {
  id: '1',
  address: '5CmFmVadzNQFaeiyXXNugRXT1MuaoocUyogtYHEQeWjGp7pX',
  notes: 'lorem ipsum',
  files: [
    {
      displayName: 'colors.svg',
      cid: 'Qmdk3gwwrfoWif9zJ3YTahH7fGq3JgqDBR3G2kqvbAqCro:pdf:Lorem_ipsum.pdf'
    },
    {
      displayName: 'file.pdf',
      cid: 'Qmdk3gwwrfoWif9zJ3YTahH7fGq3JgqDBR3G2kqvbAqCro:pdf:Lorem_ipsum.pdf'
    }
  ],
  status: 'Rejected'
}
