<template lang="pug">
#container
  .row.justify-between.q-mb-md
    .text-h5 Vault Details
    q-btn(
      label="Delete vault"
      color="negative"
      icon="delete"
      no-caps
      outline
      @click="removeVault"
    )
  .text-body2 VaultId: {{ vaultId }}
  .text-body2 Owner: {{ owner }}
  .text-body2 Description: {{ description }}
  .text-body2 Threshold: {{ threshold }}
</template>

<script>
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount'])
  },
  watch: {
    selectedAccount () {
      this.$router.replace({
        name: 'manageVaults'
      })
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
  },
  methods: {
    async removeVault () {
      try {
        this.showLoading()
        await this.$store.$nbvStorageApi.removeVault({
          id: this.vaultId,
          user: this.selectedAccount.address
        })
        this.$router.replace({
          name: 'manageVaults'
        })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
