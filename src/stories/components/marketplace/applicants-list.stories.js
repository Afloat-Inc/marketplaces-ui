/* eslint-disable no-useless-call */
import ApplicantsList from '../../../components/marketplace/applicants-list'
import { action } from '@storybook/addon-actions'
// import { expect } from '@storybook/jest'
// import { userEvent, within } from '@storybook/testing-library'
export default {
  title: 'Marketplace/ApplicantsList',
  component: ApplicantsList,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    onEnroll: { action: action('onEnroll') },
    onReject: { action: action('onReject') }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ApplicantsList },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  methods: {
    onEnroll (e) {
      action('onEnroll').call(null, e)
      this.data = e
      console.log('data', this.data)
    },
    onReject (e) {
      action('onReject').call(null, e)
      this.data = e
      console.log('data', this.data)
    }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<ApplicantsList v-bind="args" @onEnrollApplicant="onEnroll" @onRejectApplicant="onReject"/>'
})

// Base component
export const Base = Template.bind({
})

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Base.args = {
  applicants: [
    {
      status: 'Pending',
      notes: 'lorem ipsum',
      files: [
        {
          displayName: 'colors.svg',
          cid: 'Qmdk3gwwrfoWif9zJ3YTahH7fGq3JgqDBR3G2kqvbAqCro:pdf:Lorem_ipsum.pdf'
        }
      ],
      address: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
    },
    {
      status: 'Rejected',
      notes: 'lorem ipsum',
      files: [
        {
          displayName: 'colors.svg',
          cid: 'Qmdk3gwwrfoWif9zJ3YTahH7fGq3JgqDBR3G2kqvbAqCro:pdf:Lorem_ipsum.pdf'
        },
        {
          displayName: 'colors.svg',
          cid: 'Qmdk3gwwrfoWif9zJ3YTahH7fGq3JgqDBR3G2kqvbAqCro:pdf:Lorem_ipsum.pdf'
        },
        {
          displayName: 'colors.svg',
          cid: 'Qmdk3gwwrfoWif9zJ3YTahH7fGq3JgqDBR3G2kqvbAqCro:pdf:Lorem_ipsum.pdf'
        }
      ],
      address: '5CmFmVadzNQFaeiyXXNugRXT1MuaoocUyogtYHEQeWjGp7pX'
    }
  ]

}
