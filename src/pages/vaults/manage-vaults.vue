<template lang="pug">
#container
  .text-h5.q-mb-md Manage Vaults
  q-item(v-for="vault in vaultList")
    q-item-section
      p {{ vault.owner }}
      p {{ vault.description }}
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
  name: 'ManageVaults',
  data () {
    return {
      vaultList: []
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount'])
  },
  watch: {
    selectedAccount () {
      this.getVaults()
    }
  },
  async mounted () {
    this.getVaults()
  },
  methods: {
    async getVaults () {
      try {
        this.showLoading()
        const vaultsId = await this.$store.$nbvStorageApi.getVaultsByUser({
          user: this.selectedAccount.address
        })
        console.log('vaultsId', vaultsId.toJSON())
        if (!vaultsId.isEmpty) {
          const vaults = await this.$store.$nbvStorageApi.getVaultsById({
            Ids: vaultsId.toJSON()
          })
          this.vaultList = vaults.map(v => v.toHuman())
          console.log('vaults', vaults, this.vaultList)
        } else this.vaultList = []
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
