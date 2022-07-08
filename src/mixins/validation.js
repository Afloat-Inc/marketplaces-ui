export const validation = {
  data () {
    return {
      rules: {
        // accountExists: async account => !(await this.isAccountFree(account.toLowerCase())) || this.$t('forms.errors.accountNotExists', { account }),
        // accountFormat: val => /^([a-z]|[1-5]|.){1,12}$/.test(val.toLowerCase()) || this.$t('forms.errors.accountFormat'),
        // accountFormatBasic: val => /^([a-z]|[1-5]){12}$/.test(val.toLowerCase()) || this.$t('forms.errors.accountFormatBasic'),
        // accountLength: val => val.length <= 12 || this.$t('forms.errors.accountLength'),
        dateFuture: date => val => new Date(val).getTime() >= new Date(date).getTime() || this.$t('forms.errors.dateFuture'),
        greaterOrEqualThan: value => val => val >= value || this.$t('forms.errors.greaterOrEqualThan', { value }),
        lessOrEqualThan: value => val => val <= value || this.$t('forms.errors.lessOrEqualThan', { value }),
        containAtLeastCosigners: value => val => val.length >= value || this.$t('forms.errors.containAtLeastCosigners', { value }),
        containLessThanCosigners: value => val => val.length <= value || this.$t('forms.errors.containLessThanCosigners', { value }),
        // isAccountAvailable: async account => (await this.isAccountFree(account.toLowerCase())) || this.$t('forms.errors.accountNotAvailable', { account }),
        isInteger: val => Number.isInteger(parseInt(val)) || this.$t('forms.errors.integer'),
        positiveInteger: val => parseInt(val) > 0 || this.$t('forms.errors.positiveInteger'),
        required: val => !!val || this.$t('forms.errors.required'),
        isValidXPub: val => /([xyYzZtuUvV]pub[1-9A-HJ-NP-Za-km-z]{80,120})/.test(val) || this.$t('forms.errors.isNotValidXpub'),
        isValidFullXpub: val => /(\[[0-Z]{8}\/[0-9]{1,2}(')(\/)[0-9]{1,2}(')\/[0-9]{1,2}(')\/[0-9](')(]){1,30})([xyYzZtuUvV]pub[1-9A-HJ-NP-Za-km-z]{80,120})/.test(val) || this.$t('forms.errors.isNotValidXpub'),
        isValidMainetBTC: val => /([13][a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[ac-hj-np-zAC-HJ-NP-Z02-9]{11,71})/.test(val) || this.$t('forms.errors.isNotValidMainetBTC'),
        isValidPolkadotAddress: val => this.$store.$polkadotApi?.isValidPolkadotAddress(val) || this.$t('forms.errors.isNotValidPolkadotAddress')
      }
    }
  },
  beforeMount () {
    // this.moneyAsset = new FiatAsset(0)
  },
  methods: {
    // ...mapActions('accounts', ['isAccountFree']),
    async validate (form) {
      if (!form) return true
      for await (const key of Object.keys(form)) {
        if (this.$refs[key]) {
          await this.$refs[key].validate()
        }
      }
      return Object.keys(form).reduce((valid, key) => valid && (!this.$refs[key] || !this.$refs[key].hasError), true)
    },
    resetValidation (form) {
      if (!form) return
      Object.keys(form).forEach((key) => this.$refs[key] && this.$refs[key].resetValidation())
    },
    isInteger (event) {
      // console.log('IsEvent', event)
      if (event.keyCode === 46) event.preventDefault()
    }
  }
}
