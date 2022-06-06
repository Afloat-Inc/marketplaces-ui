<template lang="pug">
.container
    IpfsViewFile(
      v-if="files.length > 0"
      :typeCids="files"
    )
    q-file(
      v-else
      outlined
      multiple
      v-model="displayNames"
      @update:model-value=" e => updateModel(e)"
      :label="labelFile"
      :loading="loading"
      :rules="[ file => validFile(file) ]"
      :filled="filled"
      :readonly="readonly"
      ref="qFile"
    )
      template(v-slot:append)
      template(slot="loading")
        q-spinner-dots(v-if="loading")
</template>

<script>
import BrowserIpfs from '~/services/BrowserIpfs.js'
import IpfsViewFile from './ipfs-view-file-selector'
export default {
  name: 'IpfsMultiInput',
  components: { IpfsViewFile },
  props: {
    label: {
      default: 'default',
      type: String
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    mcallback: {
      type: Function,
      default: () => {}
    },
    rules: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'text'
    },
    standout: {
      type: String,
      default: null
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
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
      labelFile: undefined
    }
  },
  computed: {
    isUploaded () {
      return this.files.length > 0
    }
  },
  watch: {
    'value.value' () {
      console.log('Value change: updating TypeCid', this.value)
      this.typeCid = this.value.value
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
      // this.$emit('input', { display: 'File(s)', value: this.value[0] })
      // if (this.value.display != null) this.$emit('input', { display: this.value.display, value: this.value.value })
      // else this.$emit('input', { display: null, value: this.value.value })
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
        e.forEach(element => {
          console.log('saving file', element)
          promises.push(BrowserIpfs.store(element))
        })
        console.log('Promises', promises)
        const results = await Promise.all(promises)
        const resultWithName = e.map((element, index) => {
          return {
            display: element.name,
            value: results[index] + ':' + element.name
          }
          // results[index] + ':' + element.name
        })
        this.files = resultWithName
        // const model = {
        //   display: e,
        //   value: this.typeCid
        // }
        this.loading = false
        this.$emit('update:modelValue', this.files)
      } catch (e) {
        console.error(e)
        this.loading = false
      } finally {
        await this.$forceUpdate()
      }
    },
    validFile (file) {
      if (file != null && this.loading) return true
      else if (!this.loading && this.initWithString) return true
      return this.$t('forms.errors.fileRequired')
    }
  }
}
</script>

<style lang="sass" scoped>
.label-appened
 font-size: 12px
 padding: 0px
 margin: 0px
.append
 background-color: $blue-6
 padding: 5px
 margin-right: -12px
</style>
