<template lang="pug">
#container
  .text-h6 Marketplace
  Tinput(label="lorem")
</template>

<script>
import Tinput from '~/components/common/input/t-input.vue'
export default {
  name: 'Marketplace',
  components: {
    Tinput
  },
  data () {
    return {
      keyToEncrypt: ''
    }
  }
}
</script>
