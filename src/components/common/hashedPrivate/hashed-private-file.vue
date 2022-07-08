<template lang="pug">
.row.q-col-gutter-xs
  .col-12
    .text-subtitle2 {{label}}
  q-input(
    v-model="tagFile"
    class="col-6 q-my-xs"
    outlined
    color="primary"
    placeholder="Name of the file"
    :rules="[rules]"
    class="borderRight"
    @keyup="onTypeTagFile"
    data-cy="name_file"
    testid="name_file"
    data-testid="name_file"
  )
  q-file(
    class="col-6 q-my-xs"
    outlined
    v-model="displayNames"
    @update:model-value=" e => updateModel(e)"
    :label="labelFile"
    :loading="loading"
    :rules="[ file => validFile(file) ]"
    :filled="filled"
    :readonly="readonly"
    ref="qFile"
    data-cy="qFile"
    data-testid="qFile"
  )
    template(v-slot:append)
      q-icon(
        v-if="!loading && state.loaded"
        name="check"
        color="primary"
      )
    template(slot="loading")
      q-spinner-dots(v-if="loading")
</template>

<script>
// import BrowserIpfs from '~/services/BrowserIpfs.js'
// import IpfsViewFile from './ipfs-view-file-selector'
export default {
  name: 'HashedPrivateFile',
  props: {
    administratorAddress: {
      type: String,
      default: undefined,
      required: true
    },
    label: {
      default: '',
      type: String
    },
    modelValue: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Array,
      default: () => []
    },
    filled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      loading: false,
      initWithString: false,
      typeCid: null,
      files: [],
      displayNames: undefined,
      tagFile: undefined,
      labelFile: undefined,
      state: {
        loaded: false
      }
    }
  },
  computed: {
    isUploaded () {
      return this.files.length > 0
    }
  },
  watch: {
    modelValue: {
      handler (val) {
        this.tagFile = val.label
        if (val.files?.[0]?.display) {
          this.files = val.files
        } else {
          this.files = []
        }
      },
      deep: true
    }
  },
  beforeMount () {
    console.log('Init ipfs input', this.modelValue)
    const value = this.modelValue
    if (value && typeof value === 'string') {
      this.initWithString = true
      this.typeCid = this.modelValue.value
      console.log('Case 1 filled', this.modelValue)
      this.$emit('update:modelValue', { display: null, value: this.modelValue })
    } else if (value && this.modelValue.value !== '') {
      console.log('Case 2 filled', this.modelValue)
      if (this.modelValue.length > 0) {
        this.labelFile = this.modelValue.map(file => file.display).join(', ')
      }
      this.labelFile = 'Upload file(s)'
    } else if (!value || !this.modelValue.display) {
      console.log('Case 3 filled')
      this.labelFile = 'Upload file(s)'
      this.$emit('update:modelValue', [])
    }
  },
  methods: {
    async updateModel (e) {
      this.loading = true
      console.log('Update model', e)
      try {
        const promises = []
        if (!this.administratorAddress || !this.tagFile) {
          throw new Error('Administrator address is not defined')
        }
        const hpService = this.$store.$hashedPrivateApi
        promises.push(hpService.shareNew({
          toUserAddress: this.administratorAddress,
          name: e.name,
          description: this.tagFile,
          payload: e
        }))
        console.log('Promises', promises)
        const results = await Promise.all(promises)
        console.log('Results', results[0])
        const CID = results[0].sharedData.cid
        // const label = results[0].sharedData.name
        const id = results[0].ownedData.id
        const description = results[0].sharedData.description
        const resultWithName = {
          display: description,
          value: CID + ':' + e.name,
          id
        }
        this.files = [resultWithName]
        const data = {
          label: description,
          files: this.files
        }
        this.loading = false
        this.state.loaded = true
        console.log('Update model', data)
        this.$emit('update:modelValue', JSON.parse(JSON.stringify(data)))
      } catch (e) {
        this.showNotification({ message: e.message || e, color: 'negative' })
        console.error(e)
        this.loading = false
      } finally {
        await this.$forceUpdate()
      }
    },
    validFile (file) {
      console.log('Valid file', file, typeof file)
      if (file != null && this.loading) return true
      else if (!this.loading && this.initWithString) return true
      else if (!this.loading && typeof file === 'object') return true
      return this.$t('forms.errors.fileRequired')
    },
    onTypeTagFile () {
      const data = {
        label: this.tagFile,
        files: [
          {
            display: this.files[0]?.display || undefined,
            value: this.files[0]?.value || undefined
          }
        ]
      }

      this.$emit('update:modelValue', JSON.parse(JSON.stringify(data)))
    }
  }
}
</script>

<style lang="stylus" scoped>
.label-appened
  font-size: 12px
  padding: 0px
  margin: 0px
.append
  background-color: $blue-6
  padding: 5px
  margin-right: -12px
.minSize
  min-height: 30px
</style>
