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
        .col-12(v-if="isChecked")
          account-input(
            v-model="accountToShare"
            :rules="[rules.isValidPolkadotAddress]"
            label="Account to share"
            outlined
          )
        .col-12
          q-btn(
            class="q-mr-md"
            @click="uploadFile"
            color="primary"
          ) Save
          q-btn(
            @click="clearUpload"
            color="primary"
          ) Clear

          q-toggle(
            v-model="isChecked"
            label="Share file with other"
            color="primary"
            label-position="left"
            label-width="100px"
            outlined
          )
        .col-12
          pre response: {{responseUpload}}
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
            class="q-mr-md"
            color="primary"
          ) Download
          q-btn(
            @click="clearDownload"
            color="primary"
          ) Clear
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
import { validation } from '~/mixins/validation'
import AccountInput from '~/components/common/account-input.vue'
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'
export default defineComponent({
  name: 'PageIndex',
  components: {
    AccountInput
  },
  mixins: [validation],
  data () {
    return {
      isChecked: false,
      toggle: false,
      file: undefined,
      accountToShare: undefined,
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
  async beforeMount () {
    const isLoggedIn = this.$store.$hashedPrivateApi.isLoggedIn()
    if (!isLoggedIn) {
      await this.loginUser()
    }
  },
  methods: {
    ...mapMutations('polkadotWallet', ['setIsLoggedIn']),
    async uploadFile () {
      if (this.isLoggedIn && this.selectedAccount) {
        const hpApi = this.$store.$hashedPrivateApi
        if (this.isChecked && this.accountToShare) {
          try {
            const response = await hpApi.shareNew({
              toUserAddress: this.accountToShare,
              name: 'demo name',
              description: 'demo description',
              payload: this.file
            })
            console.log(response)
            this.matchDataShare(response)
          } catch (error) {
            console.error('uploadFile', error)
            this.showNotification({ message: error.message || error, color: 'negative' })
          }
        } else {
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
    },
    matchDataShare (response) {
      this.responseUpload.cid = response.sharedData.cid
      this.responseUpload.name = response.sharedData.name
      this.responseUpload.description = response.sharedData.description
      this.responseUpload.payload = response.sharedData.payload
      this.responseUpload.type = response.sharedData.type
    },
    clearUpload () {
      this.file = undefined
      this.responseUpload.cid = undefined
      this.responseUpload.name = undefined
      this.responseUpload.description = undefined
      this.responseUpload.payload = undefined
      this.responseUpload.type = undefined
    },
    clearDownload () {
      this.query = undefined
      this.getUploadResponse.cid = undefined
      this.getUploadResponse.name = undefined
      this.getUploadResponse.description = undefined
      this.getUploadResponse.payload = undefined
      this.getUploadResponse.type = undefined
    },
    async loginUser () {
      try {
        this.showLoading({ message: 'You must be logged in to submit an application' })
        await this.$store.$hashedPrivateApi.login(this.selectedAccount.address)
        this.setIsLoggedIn(true)
      } catch (error) {
        console.error(error)
        this.showNotification({ message: error.message || error, color: 'negative' })
        this.setIsLoggedIn(false)
      } finally {
        this.hideLoading()
      }
    }
  }
})
</script>
