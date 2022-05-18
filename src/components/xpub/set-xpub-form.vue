<template lang="pug">
#container.q-gutter-y-sm
    .row.q-col-gutter-x-md
      .col-7
        q-input(
            v-model="fullXpub"
            placeholder="Paste or write your XPUB"
            label="Xpub"
            stack-label
            outlined
        )
            template(v-slot:append)
                q-icon.cursor-pointer(name="qr_code_scanner" @click="toggleQRScanner(true)")
                    q-tooltip Scan your XPUB
      .col
        .text-body2 {{ $t('general.lorem')  }}
    q-btn(
      label="Set XPUB"
      color="primary"
      no-caps
    )
    #modals
        qr-decode-xpub(ref="qrDecodeXpub" @xpubDecoded="onDecode")
</template>

<script>
import QrDecodeXpub from '~/components/decode/qr-decode-xpub'
export default {
  name: 'EtXpubForm',
  components: {
    QrDecodeXpub
  },
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
    }
  }
}
</script>
