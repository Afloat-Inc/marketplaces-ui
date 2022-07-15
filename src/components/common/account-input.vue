<template lang="pug">
#container
    q-input(
        data-cy="account_input"
        testid="account_input"
        data-testid="account_input"
        :label="label"
        v-model="value"
        :outlined="outlined"
        :rules="rules"
    )
        template(v-slot:prepend)
            account-icon.q-mt-sm(:address="value" size="40px")
        template(v-slot:label v-if="displayName && displayName.length < 30")
          #container
            span {{ label }}
            span.bg-secondary.text-white.rounded-borders.q-ml-xs.q-px-xs {{ displayName }}
            //- span(class="q-px-sm bg-deep-orange text-white text-italic rounded-borders") label
</template>

<script>
import AccountIcon from '~/components/common/account-icon.vue'
import { mapGetters } from 'vuex'

/**
 * This is a custom input to validate and show info for user address
 */
export default {
  name: 'AccountInput',
  components: { AccountIcon },
  props: {
    /**
     * Input Label
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * Used to update and handler v-model (not use modelValue, instead use v-model)
     */
    modelValue: {
      type: String,
      default: undefined
    },
    /**
     * Outlined prop extended from QInput
     */
    outlined: {
      type: Boolean,
      default: true
    },
    /**
     * Rules prop extended from QInput, to add validations
     */
    rules: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      accountInfo: undefined
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['availableAccounts']),
    value: {
      get () {
        return this.modelValue
      },
      set (value) {
        /**
         * Handler v-model automatically in parent component
         */
        this.$emit('update:modelValue', value)
      }
    },
    displayName () {
      if (this.accountInfo) {
        const identity = this.accountInfo?.identity
        const localDisplay = this.availableAccounts.find(v => v.address === this.value)
        return (identity.display) ? identity.display : localDisplay?.meta?.name || this.value
      } return undefined
    }
  },
  watch: {
    async value (account) {
      const isValid = this.isValidPolkadotAddress(account)
      if (isValid === true) {
        const response = await this.$store.$polkadotApi.getAccountInfo(account)
        this.accountInfo = response
      } else this.accountInfo = false
    }
  },
  methods: {
    isValidPolkadotAddress (v) {
      if (!v) {
        return 'This field is required'
      } else if (this.$store && this.$store.$polkadotApi && this.$store.$polkadotApi.isValidPolkadotAddress(v)) {
        return true
      }
      return 'Is not a valid polkadot address'
    }
  }
}
</script>
