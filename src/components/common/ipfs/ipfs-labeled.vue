<template lang="pug">
.row.q-col-gutter-xs
  q-input(
    v-model="tagFile"
    class="col-6 q-my-xs"
    outlined
    color="primary"
    placeholder="Name of the file"
    class="borderRight"
    @keyup="onTypeTagFile"
  )
  IpfsViewFile(
    v-if="files.length > 0"
    class="col-6 q-my-xs"
    :typeCids="files"
  )
  q-file(
    v-else
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
  )
    template(v-slot:append)
    template(slot="loading")
      q-spinner-dots(v-if="loading")
</template>

<script>
import BrowserIpfs from '~/services/BrowserIpfs.js'
import IpfsViewFile from './ipfs-view-file-selector'
export default {
  name: 'TIpfsLabeled',
  components: { IpfsViewFile },
  props: {
    label: {
      default: 'default',
      type: String
    },
    modelValue: {
      type: Object,
      default: () => {}
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
  emits: ['update:modelValue', 'onDelete'],
  data () {
    return {
      loading: false,
      initWithString: false,
      typeCid: null,
      files: [],
      displayNames: undefined,
      tagFile: undefined,
      labelFile: undefined
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
        promises.push(BrowserIpfs.store(e))
        console.log('Promises', promises)
        const results = await Promise.all(promises)
        const resultWithName = {
          display: e.name,
          value: results[0] + ':' + e.name
        }
        this.files = [resultWithName]
        const data = {
          label: this.tagFile,
          files: this.files
        }
        this.loading = false
        this.$emit('update:modelValue', JSON.parse(JSON.stringify(data)))
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
