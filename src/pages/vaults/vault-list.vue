<template lang="pug">
#container
  .text-h5 Vault List
  .row.q-gutter-sm
    q-btn(
      label="create vault"
      color="primary"
      @click="createNewVault"
    )
    q-btn(
      label="go to details"
      :to="{ name: 'vaultDetails' }"
    )
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'VaultList',
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount'])
  },
  async mounted () {
    this.getVaults()
  },
  methods: {
    async getVaults () {
      try {
        this.showLoading()
        const r = await this.$store.$nbvStorageApi.getVaultsByUser({
          user: this.selectedAccount.address
        })
        const r2 = await this.$store.$nbvStorageApi.getVaults({
          user: '0x6065f2ed7f84b6b3da6b297e740623cf5150e82bac9f6c5687239646e1e9b5e1'
        })
        console.log('vaults r', r)
        console.log('vaults r2', r2.value.toHuman())
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async createNewVault () {
      try {
        this.showLoading()
        await this.$store.$nbvStorageApi.createVault({
          threshold: 2,
          description: 'This is just a test',
          cosigners: ['5DaWmLfzBTLbKFwBC5YxtAQ45XMSAQCDLcZL6zW9ZiJsGSST'],
          user: this.selectedAccount.address
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
