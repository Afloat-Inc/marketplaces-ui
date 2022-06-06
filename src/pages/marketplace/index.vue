<template lang="pug">
#container
  .text-h6 Marketplace
  Tinput(label="lorem")
  IpfsMultiInput(v-model="files")
</template>

<script>
import Tinput from '~/components/common/input/t-input.vue'
import IpfsMultiInput from '~/components/common/ipfs/ipfs-multi-input.vue'
export default {
  name: 'Marketplace',
  components: {
    Tinput,
    IpfsMultiInput
  },
  data () {
    return {
      keyToEncrypt: '',
      files: undefined
    }
  }
}
</script>
