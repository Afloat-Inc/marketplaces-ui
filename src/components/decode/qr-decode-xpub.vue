<template lang="pug">
q-dialog(v-model="open")
  q-card.q-pa-md
    .text-h5 QR Decode
    .row.justify-center.q-mt-md
        q-spinner-pie(
            color="primary"
            size="20em"
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
    async onQrDetected (xpub) {
      try {
        console.log('on onQrDetected', xpub)
        this.isDecrypting = true
        const decoder = new Decoder()
        const result = await new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              const r = decoder.decodeXPub(xpub)
              resolve(r)
            } catch (e) {
              reject(e)
            }
          }, 1000)
        })
        console.log('xpub decoded', result)
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
