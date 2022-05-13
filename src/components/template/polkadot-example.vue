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
    .col
      q-btn.full-width(
        @click="connectPolkadot"
        label="Connect to polkadot"
      )
    .col
      q-btn.full-width(
        :disable="!api"
        @click="requestUsers"
        label="Request users"
      )
    .col
      q-btn.full-width(
        :disable="!api"
        @click="getProposals"
        label="Get proposals"
      )
    .col
      q-btn.full-width(
        :disable="!api"
        @click="showCreateProposal"
        label="Create proposal"
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
  //- .q-mt-md
  //-   QrStream(
  //-     @decode="onDecode"
  //-   )
  #modals
    q-dialog(v-model="showingCreateProposal" persistent)
      q-card.modalSize
        create-proposal-form
</template>

<script>
import { ref, onMounted, computed } from 'vue'
// import PolkadotApi from '~/services/polkadotApi.js'
import useNotification from '~/mixins/notifications'
import ProposalCard from '~/components/proposals/proposal-card'
import CreateProposalForm from '~/components/proposals/create-proposal-form'
// import Identicon from '@polkadot/vue-identicon'
import { useStore } from 'vuex'

import { QrStream } from 'vue3-qr-reader'

export default {
  name: 'PolkadotExample',
  components: {
    ProposalCard,
    CreateProposalForm,
    QrStream
  },
  setup () {
    const $store = useStore()
    const title = ref('Polkadot Example')
    const connResultPolkadot = ref(undefined)
    const accounts = ref(undefined)
    const wssUrl = ref(undefined)
    const proposals = ref(undefined)
    const showingCreateProposal = ref(false)
    const { showNotification, showLoading, hideLoading } = useNotification()
    const api = computed(() => $store.getters['polkadotWallet/api'])
    onMounted(() => {
      try {
        wssUrl.value = 'wss://n1.hashed.systems'
      } catch (e) {
        console.error(e)
      }
      // console.log('onMounted', Identicon)
    })

    async function connectPolkadot () {
      try {
        connResultPolkadot.value = undefined
        showLoading()
        // api.value = new PolkadotApi({ wss: wssUrl.value })
        connResultPolkadot.value = await $store.dispatch('polkadotWallet/connectToServer', wssUrl.value)
      } catch (e) {
        console.error('connectPolkadot', e)
        // api.value = undefined
        showNotification({ color: 'red', message: e.message || e })
      } finally {
        hideLoading()
      }
    }

    async function requestUsers () {
      try {
        showLoading({ message: 'Trying to get accounts, please review polkadot{js} extension' })
        // const api = new PolkadotApi({ wss: wssUrl.value })
        accounts.value = await api.value.requestUsers()
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
        const response = await api.value.getProposals()
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
      console.warn('onDecode', event)
    }

    return {
      title,
      requestUsers,
      connectPolkadot,
      connResultPolkadot,
      accounts,
      wssUrl,
      getProposals,
      proposals,
      api,
      showCreateProposal,
      showingCreateProposal,
      onDecode
    }
  }
}
</script>
