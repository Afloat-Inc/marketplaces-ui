<template lang="pug">
#container
  .row.justify-between.q-mb-md
    .text-h5 Vault Details
    .row.q-gutter-x-sm
      q-btn(
        label="Export descriptor"
        color="secondary"
        icon="qr_code"
        no-caps
        outline
        @click="exportVault"
        v-if="outputDescriptor"
      )
      q-btn(
        label="Delete vault"
        color="negative"
        icon="delete"
        no-caps
        outline
        @click="removeVault"
        v-if="iAmOwner"
      )
  .text-subtitle2.q-mt-md VaultId
  .text-body2 {{ vaultId }}
  .text-subtitle2.q-mt-md Owner
  account-item(:address="owner")
  .text-subtitle2.q-mt-md Cosigners
  .q-gutter-sm(v-for="cosigner in cosigners")
    account-item.q-mt-md(:address="cosigner")
  .row
    .col
      .text-subtitle2.q-mt-md Description
      .text-body2 {{ description }}
    .col
      .text-subtitle2.q-mt-md Threshold
      .text-body2 {{ threshold }}
  //- .text-subtitle2.q-mt-md Descriptors
  //- .text-body2 {{ outputDescriptor }}
  .text-subtitle2.q-mt-md Proposals
  #proposals
    q-btn(
      label="Create proposal"
      icon="add"
      color="secondary"
      no-caps
      outline
      @click="isShowingCreateProposal = true"
    )
  #modals
    q-dialog(v-model="isShowingCreateProposal" persistent)
      q-card.modalSize
        create-proposal-form(@submittedForm="createNewProposal")
    q-dialog(v-model="isShowingVaultQR")
      q-card.modalQrSize
        .text-body2.text-weight-light.q-ml-sm.text-center.q-mt-sm Descriptor QR
        div.qrContainer(v-html="vaultQR")
</template>

<script>
import { mapGetters } from 'vuex'
import { AccountItem } from '~/components/common'
import CreateProposalForm from '~/components/proposals/create-proposal-form'
import { Encoder } from '@smontero/nbv-ur-codec'
import axios from 'axios'
export default {
  name: 'VaultDetails',
  components: { AccountItem, CreateProposalForm },
  data () {
    return {
      vaultId: undefined,
      owner: undefined,
      description: undefined,
      changeDescriptor: undefined,
      outputDescriptor: undefined,
      threshold: undefined,
      cosigners: undefined,
      isShowingCreateProposal: false,
      isShowingVaultQR: false,
      vaultQR: undefined
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount']),
    iAmOwner () {
      return this.selectedAccount.address === this.owner
    }
  },
  watch: {
    selectedAccount () {
      this.$router.replace({
        name: 'manageVaults'
      })
    }
  },
  mounted () {
    // console.log('vaultDetails', this.$router, this.$route)
    const vault = this.$route.params
    if (!vault || !vault.owner) this.$router.replace({ name: 'manageVaults' })
    // console.log('vault', vault)
    this.loadDetails(vault)
    // this.$route.meta.breadcrumb[1].name = 'Detailsss'
  },
  methods: {
    async loadDetails (vault) {
      this.vaultId = vault.vaultId
      this.owner = vault.owner
      this.description = vault?.description
      this.threshold = vault?.threshold
      this.cosigners = vault?.cosigners
      this.outputDescriptor = vault?.outputDescriptor
      this.changeDescriptor = vault?.changeDescriptor
    },
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
    },
    async exportVault () {
      try {
        this.showLoading()
        if (!this.vaultQR) {
          // console.log('vaultQR', process.env.BDK_SERVICES_URL, BDK_SERVICES_URL)
          const http = axios.create({
            baseURL: process.env.BDK_SERVICES_URL,
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const { data } = await http.post('/get_multisig', {
            descriptor: this.outputDescriptor
          })
          // console.log('descr', data)
          const encoder = new Encoder()
          // console.log('data to export', data)
          const result = encoder.vaultToQRCode(data, this.description)
          this.vaultQR = result
        }
        this.isShowingVaultQR = true
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async createNewProposal (payload) {
      try {
        this.showLoading()
        await this.$store.$nbvStorageApi.createProposal({
          vaultId: this.vaultId,
          signer: this.selectedAccount.address,
          recipientAddress: payload.recipientAddress,
          satoshiAmount: payload.amountInSats
        })
        this.isShowingCreateProposal = false
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

<style lang="stylus" scoped>
.qrContainer
  width: '200px'
  height : '200px'
</style>
