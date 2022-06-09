<template lang="pug">
q-item.no-padding(dense @click="openFile" clickable)
  q-item-section(avatar)
    q-icon(name="file_open" color="primary")
  q-item-section
    .text-body2 {{ displayName }}
  q-item-section(avatar)
    .text-overline.q-mr-xs 2mb
  slot
</template>

<script>
export default {
  name: 'FileItem',
  props: {
    cid: {
      type: String,
      default: undefined
    },
    displayName: {
      type: String,
      default: undefined
    }
  },
  methods: {
    openFile () {
      const fileUrl = 'https://storybook.js.org/docs/vue/get-started/introduction'
      window.open(fileUrl, '_blank')
    //   this.$emit('')
    }
  }
}
</script>
