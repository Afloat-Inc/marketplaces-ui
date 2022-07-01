<template lang="pug">
#container
  .text-h6 Home
  .row.q-col-gutter-xl
    .col-6
      .text-h6.q-py-md Upload file
      .row.q-gutter-md
        .col-12
          q-file(
            v-model="file"
            label="Upload File"
            outlined
          )
        .col-12
          q-btn(
            @click="uploadFile"
            color="primary"
          ) Save
        .col-12 response: {{responseUpload}}
    .col-6
      .text-h6.q-py-md Download file
      .row.q-gutter-md
        .col-12
          q-input(
            outlined
            v-model="query"
            label="Download File (CID or ID)"
          )
        .col-12
          q-btn(
            @click="downloadFile"
            color="primary"
          ) Download
          q-toggle(
            v-model="toggleDownload"
            label="Shared data?"
          )
        .col-12 Query: {{query}}
        .col-12
          pre response: {{getUploadResponse}}
        .col-12
          q-btn(
            color="primary"
            v-if="getUploadResponse.payload"
            @click="openFile"
          ) open File
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      toggle: false,
      file: undefined,
      responseUpload: {
        cid: undefined,
        name: undefined,
        description: undefined,
        payload: undefined,
        type: undefined
      },
      query: undefined,
      toggleDownload: false,
      getUploadResponse: {
        cid: undefined,
        name: undefined,
        description: undefined,
        payload: undefined,
        type: undefined
      }
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['isLoggedIn', 'selectedAccount'])
  },
  methods: {
    async uploadFile () {
      if (this.isLoggedIn && this.selectedAccount) {
        const hpApi = this.$store.$hashedPrivateApi
        console.log('uploadFile', this.file)
        try {
          const response = await hpApi.upsert({
            name: 'name2',
            description: 'desc1',
            payload: this.file
          })
          console.log(response)
          this.matchDataUpsert(response)
        } catch (error) {
          console.error('uploadFile', error)
          this.showNotification({ message: error.message || error, color: 'negative' })
        }
      } else {
        this.showNotification({ message: 'You need to be logged in to upload a file', color: 'negative' })
      }
    },
    async downloadFile () {
      if (this.isLoggedIn && this.selectedAccount) {
        const hpApi = this.$store.$hashedPrivateApi
        try {
          const response =
            this.toggleDownload
              ? await hpApi.sharedViewByCID(this.query)
              : await hpApi.ownViewByCID(this.query)
          console.log(response)
          this.matchDataViewByCID(response)
        } catch (error) {
          console.error('download File', error)
          this.showNotification({ message: error.message || error, color: 'negative' })
        }
      } else if (!this.isLoggedIn) { this.showNotification({ message: 'You need to be logged in to download a file', color: 'negative' }) }
    },
    openFile () {
      if (this.getUploadResponse.payload && this.getUploadResponse.payload instanceof File) {
        window.open('https://ipfs.io/ipfs/' + this.getUploadResponse.cid)
        const blob = new Blob([this.getUploadResponse.payload], { type: this.getUploadResponse.payload.type })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', this.getUploadResponse.name)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        this.showNotification({ message: 'No file to open', color: 'negative' })
      }
    },
    matchDataViewByCID (response) {
      this.getUploadResponse.cid = response.cid
      this.getUploadResponse.name = response.name
      this.getUploadResponse.description = response.description
      this.getUploadResponse.payload = response.payload
      this.getUploadResponse.type = response.type
    },
    matchDataUpsert (response) {
      this.responseUpload.cid = response.cid
      this.responseUpload.name = response.name
      this.responseUpload.description = response.description
      this.responseUpload.payload = response.payload
      this.responseUpload.type = response.type
    }
  }
})
</script>
