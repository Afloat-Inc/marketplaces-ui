<template lang="pug">
#container.q-gutter-y-sm
  q-form(ref="form" @submit="setXpub")
    .row.q-col-gutter-x-md
      .col-7
          q-input(
              v-model="fullXpub"
              placeholder="Paste or write your XPUB"
              label="XPUB"
              stack-label
              outlined
              :rules="[rules.required]"
          )
              template(v-slot:append)
                  q-icon.icon-btn(name="qr_code_scanner" @click="toggleQRScanner(true)")
                      q-tooltip Scan your XPUB
      .col
        .text-body2 {{ $t('general.lorem')  }}
    q-btn(
      label="Set XPUB"
      color="primary"
      no-caps
      type="submit"
    )
  #modals
    qr-decode-xpub(ref="qrDecodeXpub" @xpubDecoded="onDecode")
</template>

<script>
import QrDecodeXpub from '~/components/decode/qr-decode-xpub'
import { validation } from '~/mixins/validation'

export default {
  name: 'SetXpubForm',
  components: {
    QrDecodeXpub
  },
  mixins: [validation],
  props: {
    userAddress: {
      type: String,
      default: undefined
    }
  },
  emits: ['submitted'],
  data () {
    return {
      fullXpub: undefined
    }
  },
  methods: {
    toggleQRScanner (bool) {
      if (bool) {
        this.$refs.qrDecodeXpub.openDialog()
      } else this.$refs.qrDecodeXpub.hideDialog()
    },
    onDecode (xpub) {
      this.toggleQRScanner(false)
      this.fullXpub = xpub.fullXpub
    },
    setXpub () {
      this.$emit('submitted', {
        XPUB: this.fullXpub
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.icon-btn:hover
  color: $primary
</style>
