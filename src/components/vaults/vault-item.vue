<template lang="pug">
q-card.q-pa-sm
  q-item
    q-item-section
      .text-body2 Id: {{ vaultId }}
      .text-body2 Owner: {{ owner }}
      .text-body2 Description: {{ description }}
      .text-body2 Threshold: {{ threshold }}
    q-item-section(avatar)
      q-btn(
        label="See details"
        icon="summarize"
        no-caps
        size="sm"
        color="secondary"
        @click="goToVaultDetails"
      )
</template>

<script>
export default {
  name: 'VaultItem',
  props: {
    vaultId: {
      type: String,
      default: undefined
    },
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
  },
  methods: {
    goToVaultDetails () {
      const vault = {
        vaultId: this.vaultId,
        cosigners: this.cosigners,
        description: this.description,
        descriptors: this.descriptors,
        owner: this.owner,
        threshold: this.threshold
      }
      this.$router.push({
        name: 'vaultDetails',
        params: vault
      })
    }
  }
}
</script>
