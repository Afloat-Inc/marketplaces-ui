<template lang="pug">
div
  cryptoDialog(:keyToEncrypt="key" :openDialog="dialog" @closeDialog="onCloseDialog")
  q-file(
    data-cy='fileInput'
    v-model='file.data'
    :loading="file.loading"
    :label="label",
    outlined,
    bottom-slots,
    dense,
    :filter="checkFileSize",
    :rules="rules",
    @rejected="onRejected",
    @input="e => handleFile(e)"
  )
    template(v-slot:before)
      div(style="width: 20px; height: 20px")
        svg.h-5.w-5(
          xmlns="http://www.w3.org/2000/svg",
          viewbox="0 0 20 20",
          fill="currentColor"
        )
          path(
            d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
          )
    template(v-slot:hint) {{hint}}
  q-btn(
    outline
    color="secondary"
    label="encrypt"
    @click="onEncrypt()"
  )
  q-toggle(
    data-cy='encryptToggle'
    size='xs',
    no-hover,
    v-model='file.encrypt',
    label='Encrypt',
    @input='onEncrypt()'
  )
</template>
<script>
import BrowserIpfs from '~/services/BrowserIpfs.js'
import Encrypt from '~/utils/EncryptUtil'
import cryptoDialog from './crypto-dialog.vue'
export default {
  name: 'TFile',
  components: { cryptoDialog },
  props: {
    /**
     * The label of the input
     * @type {String}
     * @default 'Choose a file'
     * @required
     */
    label: {
      type: String,
      default: 'Choose a file'
    },
    /**
     * The rules of the input
     * @type {Array}
     * @default []
     * @required
     */
    rules: {
      type: Array,
      default: () => []
    },
    /**
     * The hint of the input
     * @type {String}
     * @default ''
     * @required
     */
    hint: {
      type: String,
      default: ''
    },
    /**
     * The file to upload
     * @type {Object}
     * @default {}
     * @required
     */
    fileToUpload: {
      type: Object,
      default: () => ({})
    },
    /**
     * The key to encrypt and decrypt your data
     * @type {String}
     * @default ''
     * @required
     */
    keyToEncrypt: {
      type: String,
      required: true,
      default: undefined
    },
    /**
     * The size of the file
     * @type {String}
     * @default ''
     * @required
     */
    size: {
      type: Number,
      default: 1000
    }

  },
  emits: ['update'],
  data () {
    return {
      key: this.keyToEncrypt,
      dialog: false,
      file: {
        encrypt: false,
        loading: undefined,
        data: undefined,
        cid: undefined,
        name: undefined
      }
    }
  },
  watch: {
    fileToUpload: async function (newVal) {
      if (newVal) {
        await this.uploadFileToIpfs()
      }
    }
  },
  beforeMount () {
    if (this.encrypted?.substring(0, 8) === 'eFile://') {
      this.file.encrypt = true
    }
  },
  methods: {
    checkFileSize (files) {
      return files.filter((file) => file.size < 1024000 * 500)
    },
    onRejected (rejectedEntries) {
      this.showErrorMsg('The file need to be less than 500MB')
    },
    async handleFile (e) {
      this.file.data = e
    },
    async uploadFileToIpfs () {
      const self = this
      self.file.loading = true
      let file = this.file.data
      try {
        if (!this.key && this.file.encrypt) {
          this.setCryptoDialogState(true)
          return
        }
        if (this.file.encrypt) file = await Encrypt.encryptFile(file, this.key, file.name.split('.')[1])
        this.loading = true
        const typeCid = await BrowserIpfs.store(file)
        self.showSuccessMsg('File uploaded success')
        self.file.name = file
        self.file.cid = this.file.encrypt ? 'eFile://' + typeCid : 'File://' + typeCid
        // self.setUploadFile(false)
        self.$emit('update', self.file.cid)
      } catch (error) {
        self.showErrorMsg('Error ocurred while file was uploaded. ' + error)
        console.error(error)
      } finally {
        self.file.loading = false
      }
    },
    async onEncrypt () {
      if (!this.key || this.key === '') {
        alert('Please enter a key to encrypt your file')
        this.file.encrypt = false
        this.setCryptoDialogState(true)
        this.showErrorMsg('You need to set a key to encrypt')
      }
    },
    setCryptoDialogState (bool) {
      this.dialog = bool
    },
    onCloseDialog (key) {
      this.key = key
      alert(key)
      this.dialog = false
    }
  }
}
</script>
<style lang="sass">
</style>
