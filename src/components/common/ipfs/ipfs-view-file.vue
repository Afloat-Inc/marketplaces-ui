<template lang="pug">
#container
  #iconMode(v-if="iconMode")
    q-icon.cursor-pointer(
      v-if="typeCid && !loading"
      :name="icon"
      color="primary"
      size="sm"
      @click="viewFile"
      :color="color"
    )
    q-icon.cursor-not-allowed(
      v-if="!typeCid && !loading"
      name="block"
      color="primary"
      size="sm"
      :color="color"
      disabled
    )
      q-tooltip Not yet uploaded
    q-spinner(
      v-if="loading"
      color="primary"
      size="sm"
    )
  #btnMode(v-else)
    q-btn(
      outline
      v-if="typeCid"
      :loading="loading"
      :color="'secondary'"
      @click="viewFile"
      :label="labelC"
      :icon="icon"
    )
</template>

<script>
import BrowserIpfs from '~/services/BrowserIpfs.js'

export default {
  name: 'IpfsViewFile',
  props: {
    typeCid: {
      type: String,
      default: ''
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
      default: 'file-text'
    },
    iconMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    labelC () {
      return this.label === '' ? this.$t('common.buttons.viewFile') : this.label
    }
  },
  methods: {
    async viewFile (e) {
      this.loading = true
      try {
        const file = await BrowserIpfs.retrieve(this.typeCid)
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
