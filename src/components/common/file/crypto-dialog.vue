<template lang="pug">
q-dialog(v-model="openDialog" persistent)
  q-card(data-cy='cryptoDialog')
    q-card-section
      .text-h6 Enter key to encrypt and decrypt your data
    q-form(
        @submit="onSubmit"
        class="q-gutter-md"
    )
      q-card-section
      TInput(
        :value="cryptoKey"
        @update="alert"
        :type="isPwd ? 'password' : 'text'"
        label="Insert your key"
        id='keyInput'
        data-cy='keyInput'
        :rules="[rules.required]"
      )
        template(v-slot:append)
          q-icon(
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          )
      q-card-actions(align="right")
        q-btn(
          color="primary"
          id='confirmKey'
          data-cy='confirmKey'
          :label="$t('common.buttons.confirm')"
          type="submit"
        )
</template>

<script>
import { validation } from '~/mixins/validation'
import TInput from '~/components/common/input/t-input.vue'

export default {
  name: 'CryptoDialog',
  components: { TInput },
  mixins: [validation],
  props: {
    /**
     * Toggle to show the dialog
     */
    openDialog: {
      required: true,
      type: Boolean,
      default: false
    },
    /**
     * The key to encrypt and decrypt your data
     */
    keyToEncrypt: {
      required: true,
      type: String,
      default: ''
    }
  },
  emits: ['close-dialog'],
  data () {
    return {
      cryptoKey: undefined,
      isPwd: true
    }
  },
  watch: {
    cryptoKey: function (val) {
      alert(val)
    }
  },
  beforeMount () {
    this.cryptoKey = this.keyToEncrypt
  },
  methods: {
    /**
     * This event is emitted when the modal is clicked on closed or out space
     */
    onSubmit () {
      /**
       * When the key have filled, will send the key to parent component
       */
      this.$emit('close-dialog', this.cryptoKey)
    }
  }
}
</script>

<style>

</style>
