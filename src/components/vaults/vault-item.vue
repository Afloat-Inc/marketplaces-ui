<template lang="pug">
q-card.q-pa-sm
  .text-body2 {{ owner }}
  .text-body2 {{ description }}
</template>

<script>
export default {
  name: 'VaultItem',
  props: {
    cosigners: {
      type: Array,
      default: () => []
    },
    description: {
      type: String,
      default: undefined
    },
    descriptors: {
      type: Object,
      default: () => {}
    },
    owner: {
      type: String,
      default: undefined
    },
    threshold: {
      type: [String, Number],
      default: undefined
    }
  }
}
</script>
