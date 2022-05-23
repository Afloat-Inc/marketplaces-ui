<template lang="pug">
#container
  .row.justify-between.q-mb-md
    .text-h5 Manage Vaults
    q-btn(
      label="Create vault"
      color="primary"
      icon="add"
      no-caps
      outline
      @click="isShowingCreateVault = true"
    )
  vault-list.q-my-md(:vaults="vaultList")
  #modals
    q-dialog(v-model="isShowingCreateVault")
      q-card.modalSize
        create-vault-form(@submittedForm="createNewVault" :signer="selectedAccount.address")
</template>

<script>
import { mapGetters } from 'vuex'
import VaultList from '~/components/vaults/vault-list.vue'
import CreateVaultForm from '~/components/vaults/create-vault-form.vue'

export default {
  name: 'ManageVaults',
  components: { VaultList, CreateVaultForm },
  data () {
    return {
      vaultList: [],
      isShowingCreateVault: false
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
        if (!vaultsId.isEmpty) {
          const Ids = vaultsId.toJSON()
          // console.log('vaultsId', Ids)
          const vaults = await this.$store.$nbvStorageApi.getVaultsById({ Ids })
          this.vaultList = vaults.map((v, i) => {
            return {
              ...v.toHuman(),
              vaultId: Ids[i]
            }
          })
          // console.log('vaults', vaults, this.vaultList)
        } else this.vaultList = []
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async createNewVault (data) {
      try {
        this.showLoading()
        // console.log('createNewVault', data)
        await this.$store.$nbvStorageApi.createVault({
          ...data,
          user: this.selectedAccount.address
        })
        this.isShowingCreateVault = false
        this.showNotification({ message: 'Vault created' })
        await this.getVaults()
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
