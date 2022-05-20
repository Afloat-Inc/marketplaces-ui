<template lang="pug">
#container.q-gutter-sm
  vault-item(v-for="vault in vaults" v-bind="vault")
</template>

<script>
import VaultItem from '~/components/vaults/vault-item.vue'

export default {
  name: 'VaultList',
  components: {
    VaultItem
  },
  props: {
    vaults: {
      type: Array,
      default: () => []
    }
  }
}
</script>
