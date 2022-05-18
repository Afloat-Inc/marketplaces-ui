<template lang="pug">
.full-width
  .text-h5 {{ title }}
    q-input(
      label="WSS URL"
      :rules="[val => val.length > 0 || 'Requeried field' ]"
      v-model="wssUrl"
    )
  .row(v-if="connResultPolkadot")
    p {{`You are connected to chain ${connResultPolkadot.chain} using ${connResultPolkadot.nodeName} v${connResultPolkadot.nodeVersion}`}}
  .row.q-col-gutter-md
    //- .col
    //-   q-btn.full-width(
    //-     @click="connectPolkadot"
    //-     label="Connect to polkadot"
    //-   )
    .col
      q-btn.full-width(
        @click="requestUsers"
        label="Request users"
      )
    //- .col
    //-   q-btn.full-width(
    //-     :disable="!api"
    //-     @click="login"
    //-     label="Login"
      )
    .col
      q-btn.full-width(
        @click="getProposals"
        label="Get proposals"
      )
    .col
      q-btn.full-width(
        :disable="!api"
        @click="showCreateProposal"
        label="Create proposal"
      )
    .col
      q-btn.full-width(
        @click="importXpubWallet"
        label="Import XPUB Wallet"
      )
  .q-mt-md(v-if="accounts")
    .text-h6 Keys
    .row(v-for="account in accounts")
      //- Identicon(
      //-   :size="128"
      //-   :value="account.address"
      //- )
      .text {{ account.meta.name }} - {{ account.address }}
  .q-mt-md(v-if="proposals")
    .text-h6 Proposals
    .row(v-for="proposal in proposals")
      proposal-card.q-mt-md( v-bind="proposal")
  #modals
    q-dialog(v-model="showingCreateProposal" persistent)
      q-card.modalSize
        create-proposal-form
    q-dialog(v-model="showingSetIdentity" persistent)
      q-card.modalSize
        set-identity-form(:xpubKey="xpubDecoded")
    qr-decode-xpub(ref="qrDecodeXpub" @xpubDecoded="onDecode")
</template>

<script>
import { ref, onMounted } from 'vue'
// import PolkadotApi from '~/services/polkadotApi.js'
import { useNotifications } from '~/mixins/notifications'
import ProposalCard from '~/components/proposals/proposal-card'
import CreateProposalForm from '~/components/proposals/create-proposal-form'
import SetIdentityForm from '~/components/identity/set-identity-form'
import QrDecodeXpub from '~/components/decode/qr-decode-xpub'
// import Identicon from '@polkadot/vue-identicon'
import { useStore } from 'vuex'
// import TestBtn from '@jmgayosso/test-btn'

export default {
  name: 'PolkadotExample',
  components: {
    ProposalCard,
    CreateProposalForm,
    SetIdentityForm,
    QrDecodeXpub
  },
  setup () {
    const $store = useStore()
    const title = ref('Polkadot Example')
    const connResultPolkadot = ref(undefined)
    const accounts = ref(undefined)
    const wssUrl = ref(undefined)
    const proposals = ref(undefined)
    const showingCreateProposal = ref(false)
    const showingSetIdentity = ref(false)
    const xpubDecoded = ref(false)
    const { showNotification, showLoading, hideLoading } = useNotifications()
    const api = $store.$polkadotApi
    const $treasuryApi = $store.$treasuryApi
    const qrDecodeXpub = ref(null)
    onMounted(() => {
      try {
        wssUrl.value = 'wss://n1.hashed.systems'
      } catch (e) {
        console.error(e)
      }
      // console.log('onMounted', Identicon)
    })

    async function requestUsers () {
      try {
        showLoading({ message: 'Trying to get accounts, please review polkadot{js} extension' })
        // const api = new PolkadotApi({ wss: wssUrl.value })
        accounts.value = await api.requestUsers()
      } catch (e) {
        console.error('requestUsers', e)
        showNotification({ color: 'red', message: e.message || e })
      } finally {
        hideLoading()
      }
    }

    async function login () {
      try {
        showLoading({ message: 'Trying to get accounts, please review polkadot{js} extension' })
        // const api = new PolkadotApi({ wss: wssUrl.value })
        const e = await api.value.login({ address: '5CmFmVadzNQFaeiyXXNugRXT1MuaoocUyogtYHEQeWjGp7pX' })
        console.log('login', e)
      } catch (e) {
        console.error('requestUsers', e)
        showNotification({ color: 'red', message: e.message || e })
      } finally {
        hideLoading()
      }
    }

    async function getProposals () {
      try {
        showLoading()
        // const response = await api.value.getProposals()
        const response = await $treasuryApi.getProposals()
        proposals.value = response.proposals
        console.log('getProposals', response.proposals)
      } catch (e) {
        console.error(e)
      } finally {
        hideLoading()
      }
    }

    function showCreateProposal () {
      showingCreateProposal.value = true
    }

    function onDecode (event) {
      qrDecodeXpub.value.hideDialog()
      xpubDecoded.value = event.xpubKey
      showingSetIdentity.value = true
      console.warn('onDecode', event)
    }

    function importXpubWallet (event) {
      qrDecodeXpub.value.openDialog()
    }

    return {
      title,
      requestUsers,
      connResultPolkadot,
      accounts,
      wssUrl,
      getProposals,
      proposals,
      api,
      showCreateProposal,
      showingCreateProposal,
      onDecode,
      importXpubWallet,
      qrDecodeXpub,
      login,
      showingSetIdentity,
      xpubDecoded
    }
  }
}
</script>
