<template lang="pug">
div(v-html="svgHtml")
</template>

<script>
import { polkadotIcon } from '@polkadot/ui-shared'
export default {
  name: 'AccountIcon',
  props: {
    address: {
      type: String,
      default: undefined
    },
    size: {
      type: String,
      default: '2px'
    }
  },
  data () {
    return {
      svgHtml: '<svg />'
    }
  },
  watch: {
    address () {
      this.createSvgHtml()
    }
  },
  beforeMount () {
    this.createSvgHtml()
  },
  methods: {
    createSvgHtml () {
      const circles = polkadotIcon(this.address, false).map(({ cx, cy, fill, r }) =>
        `<circle cx=${cx} cy=${cy} fill="${fill}" r=${r} />`
      ).join('')
      const size = this.size || '10px'
      this.svgHtml = `<svg height=${size} viewBox='0 0 64 64' width=${size}>${circles}</svg>`
    }
  }
}
</script>
