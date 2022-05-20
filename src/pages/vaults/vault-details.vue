<template lang="pug">
#container
  .text-h5 Vault Details
  .text-body2 VaultId: {{ vaultId }}
  .text-body2 Owner: {{ owner }}
  .text-body2 Description: {{ description }}
  .text-body2 Threshold: {{ threshold }}
</template>

<script>
export default {
  name: 'VaultDetails',
  data () {
    return {
      vaultId: undefined,
      owner: undefined,
      description: undefined,
      threshold: undefined
    }
  },
  mounted () {
    console.log('vaultDetails', this.$router, this.$route)
    const vault = this.$route.params
    if (!vault || !vault.owner) this.$router.replace({ name: 'manageVaults' })
    console.log('vault', vault)
    this.vaultId = vault.vaultId
    this.owner = vault.owner
    this.description = vault?.description
    this.threshold = vault?.threshold
    // this.$route.meta.breadcrumb[1].name = 'Detailsss'
  }
}
</script>
