<template lang="pug">
q-dialog(v-model="open")
  q-card.q-pa-md
    .row.justify-center.q-mt-md
      #error-permissions(v-if="!hasCameraPermission")
        .text-h5.text-negative.text-center Permission not granted
        .row.justify-center
          q-icon(name="video_camera_front" size="8em" color="primary")
        .text-body2.text-weight-light.text-center Please allow camera permission to scan your XPUB
      #granted-permissions(v-else)
        .text-h5.q-mb-sm QR Decode
        .text-body2.text-weight-light Please Scan your XPUB from Blue Wallet
        q-spinner-puff(
          color="primary"
          size="10em"
          v-if="isDecrypting"
        )
        QrStream.qrContainer(
          ref="qrReader"
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
      isDecrypting: false,
      hasCameraPermission: false
    }
  },
  watch: {
    async open (v) {
      await this.$nextTick()
      if (v) {
        const { state } = await navigator.permissions.query({ name: 'camera' })
        if (state === 'granted') {
          this.hasCameraPermission = true
        } else this.hasCameraPermission = false
        // console.log('response ref', permissions, this.$refs.qrReader.camera)
      }
    }
  },
  async mounted () {
    // const r = await navigator.mediaDevices.getUserMedia({ video: true })
    // console.log('response permissions', r)
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

<style lang="sass" scoped>
.qrContainer
  width: auto
  height: auto
</style>
