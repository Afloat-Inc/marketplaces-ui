// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  common: {
    buttons: {
      confirm: 'Confirm'
    }
  },
  general: {
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    loremShort: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    waitingWeb3: 'Waiting for polkadot web3 extension',
    waitingSub: 'Waiting for changes on the chain',
    navbar: {
      homeTitle: 'Home',
      marketplaceTitle: 'Marketplace',
      custodianTitle: 'Custody',
      signAndVerifyTitle: 'Sign and Verify Message',
      login: 'Login',
      logout: 'Logout'
    },
    footer: {
      contactTitle: 'Contact',
      terms: 'Terms of Use',
      privacyPolicy: 'Privacy Policy',
      faq: 'FAQ',
      copyright: 'Test by Marketplaces',
      sub: 'INC. ALL RIGHTS RESERVED'
    }
  },
  forms: {
    errors: {
      required: 'This field is required',
      isNotValidXpub: 'This is not a valid XPUB',
      positiveInteger: 'This field must contain a positive integer number',
      greaterOrEqualThan: 'The value must be greater than or equal to {value}',
      lessOrEqualThan: 'The value must be less than or equal to {value}',
      containAtLeastCosigners: 'This field must contain at least {value} cosigners address',
      containLessThanCosigners: 'This field must contain at less than {value} cosigners address',
      isNotValidMainetBTC: 'This field must contain a valid mainet BTC address',
      fileRequired: 'This field is required',
      isNotValidPolkadotAddress: 'Is not a valid polkadot address'
    }
  },
  pages: {
    marketplace: {
      marketplaceTitle: 'Marketplace',
      addMarketplaceButton: 'Add Marketplace',
      tabs: {
        myMarketplaces: 'My marketplaces',
        allMarketplaces: 'All marketplaces',
        marketInfo: 'Market information',
        enrollmentRequest: 'Enrollment requests'
      },
      details: {
        participantsTitle: 'Participants',
        noParticipants: 'No participants yet',
        numberPaparticipantsTitle: 'Number of participants',
        applicantsTitle: 'Applicants',
        noApplicants: 'No applicants yet',
        pending: 'Your application is under review',
        noMarketplaces: 'No markets yet',
        notesTitle: 'Notes',
        filesTitle: 'Files',
        enrollButton: 'Enroll',
        rejectButton: 'Rejected'
      },
      applyForm: {
        title: 'Apply for Marketplace',
        subtitle: 'Fill in the form to apply for the Marketplace',
        custodian: {
          label: 'Custodian',
          placeholder: 'Custodian address',
          checkboxLabel: 'Add a third-party custodian (optional)'
        },
        filesTitle: 'Upload files',
        addFilesButton: 'Add Files',
        notes: {
          label: 'Notes',
          placeholder: 'Notes about your application'
        },
        submitButton: 'Submit'
      },
      createForm: {
        title: 'Create new marketplace',
        label: 'Label',
        placeholder: 'Please write a description',
        button: 'Create marketplace'
      },
      searchInput: {
        label: 'Search',
        placeholder: 'Please write a keyword'
      },
      role: {
        administrator: 'Administrator',
        owner: 'Owner'
      },
      applicants: {
        title: 'Applicants'
      }
    }
  }
}
