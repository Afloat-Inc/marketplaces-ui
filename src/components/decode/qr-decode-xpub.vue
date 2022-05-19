<template lang="pug">
q-dialog(v-model="open")
  q-card.q-pa-md
    .text-h5 QR Decode
    .text-body2.text-weight-light Please Scan your xpub from Blue Wallet
    .row.justify-center.q-mt-md
        q-spinner-puff(
            color="primary"
            size="10em"
            v-if="isDecrypting"
        )
        QrStream(
          @decode="onQrDetected"
          v-else
        )
</template>

<script>
import { QrStream } from 'vue3-qr-reader'
import { Decoder } from '@smontero/nbv-ur-codec'

export default {
  name: 'QrDecodeXpub',
  components: {
    QrStream
  },
  emits: ['xpubDecoded'],
  data () {
    return {
      open: false,
      isDecrypting: false
    }
  },
  methods: {
    openDialog () {
      this.open = true
    },
    hideDialog () {
      this.open = false
    },
    async onQrDetected (xpub) {
      try {
        console.log('on onQrDetected', xpub)
        this.isDecrypting = true
        const result = await new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              const decoder = new Decoder()
              const r = decoder.decodeXPub(xpub)
              resolve(r)
            } catch (e) {
              reject(e)
            }
          }, 1000)
        })
        console.log('xpub decoded', result)
        this.$emit('xpubDecoded', result)
      } catch (e) {
        this.showNotification({
          message: e.message || e,
          color: 'red'
        })
        console.error(e)
      } finally {
        this.isDecrypting = false
      }
    }
  }
}
</script>
