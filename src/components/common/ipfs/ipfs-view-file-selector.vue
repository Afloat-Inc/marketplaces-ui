<template lang="pug">
#container
  q-select(
    v-model="fileSelected"
    outlined
    label="Select a file"
    :options="getOptions"
    @update:model-value="viewFile"
  )
    template(v-slot:append)
      q-spinner-dots(
        v-if="loading"
      )
</template>

<script>
import BrowserIpfs from '~/services/BrowserIpfs.js'

export default {
  name: 'IpfsViewFile',
  props: {
    typeCids: {
      type: Array,
      required: true
    },
    color: {
      type: String,
      default: 'secondary'
    },
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      fileSelected: undefined
    }
  },
  computed: {
    labelC () {
      return this.label === '' ? this.$t('common.buttons.viewFile') : this.label
    },
    getOptions () {
      return this.typeCids?.map(typeCid => {
        console.log(typeCid)
        const typeParts = typeCid.value.split(':')
        return {
          label: typeParts[2],
          value: typeParts[0] + ':' + typeParts[1]
        }
      })
    }
  },
  methods: {
    async viewFile () {
      this.loading = true
      try {
        const file = await BrowserIpfs.retrieve(this.fileSelected.value)
        window.open(URL.createObjectURL(file.payload))
        this.loading = false
      } catch (e) {
        console.error(e)
        this.loading = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
