<template lang="pug">
q-item.no-padding(dense @click="openFile" clickable)
  q-item-section(avatar)
    q-icon(v-if="!loading" name="file_open" color="primary")
    q-spinner(
      v-else
      color="primary"
      size="sm"
    )
  q-item-section
    .text-caption {{ description }}
  q-item-section(avatar)
    .text-caption.q-mr-xs 2mb
  slot
</template>

<script>
import BrowserIpfs from '~/services/BrowserIpfs.js'

export default {
  name: 'FileItem',
  props: {
    cid: {
      type: String,
      default: undefined
    },
    payload: {
      type: File,
      default: undefined
    },
    displayName: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async openFile () {
      if (this.payload instanceof File) {
        const url = URL.createObjectURL(this.payload)
        window.open(url, '_blank')
      } else {
        try {
          this.loading = true
          const file = await BrowserIpfs.retrieve(this.cid)
          window.open(URL.createObjectURL(file.payload))
        } catch (e) {
          console.error(e)
          this.showNotification({ message: e.message || e, color: 'negative' })
        } finally {
          this.loading = false
        }
      }
    }
  }
}
</script>
