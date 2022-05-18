<template lang="pug">
q-layout(view="lHh Lpr lFf")
    q-header
      q-toolbar
        q-btn(flat padding="0px 0px 0px 0px" no-caps text-color="white")
          selected-account-btn(:selectedAccount="selectedAccount")
          accounts-menu(:accounts="accounts" @selectAccount="onSelectAccount" :selectedAccount="selectedAccount")
        //- q-btn.pageBtn(
        //-   no-caps
        //-   label="XPUB"
        //-   flat
        //-   to="/"
        //- )
        //- q-btn(
        //-   class="pageBtn"
        //-   no-caps
        //-   label="Vaults"
        //-   flat
        //-   to="/examples"
        //- )
        .row.q-gutter-x-sm
          q-item(
            clickable
            to="/"
            active-class="activeRouter"
            dense
          )
            q-item-section
              q-item-label Vault
          q-item(
            clickable
            to="/examples"
            active-class="activeRouter"
            dense
          )
            q-item-section
              q-item-label Examples
        //- q-toolbar-title.q-ml-md Hashed Template App
        //- div Quasar v{{ $q.version }}
      q-toolbar(class="bg-white text-primary")
        q-breadcrumbs(active-color="primary" style="font-size: 16px")
          q-breadcrumbs-el.q-ml-md(label="Home" icon="home")
          q-breadcrumbs-el.q-ml-md(label="Xpub" icon="keys")

    q-page-container.main-bg
      .row.justify-center
        .col-10
          .q-pa-lg
            router-view
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useNotifications } from '~/mixins/notifications'
import { useStore } from 'vuex'
import { AccountsMenu, SelectedAccountBtn } from '~/components/common/index.js'
export default defineComponent({
  name: 'MainLayout',

  components: {
    AccountsMenu,
    SelectedAccountBtn
  },

  setup () {
    const { showNotification, showLoading, hideLoading } = useNotifications()
    const $store = useStore()
    const api = $store.$polkadotApi
    const selectedAccount = computed(() => $store.getters['polkadotWallet/selectedAccount'])
    const accounts = ref(undefined)

    onMounted(async () => {
      try {
        await connectPolkadot()
        requestUsers()
      } catch (e) {
        console.error(e)
        showNotification({ color: 'red', message: e.message || e })
      }
    })

    async function connectPolkadot () {
      try {
        showLoading()
        api.connect()
      } catch (e) {
        console.error('connectPolkadot', e)
        showNotification({ color: 'red', message: e.message || e })
      } finally {
        hideLoading()
      }
    }

    async function requestUsers () {
      try {
        showLoading({ message: 'Trying to get accounts, please review polkadot{js} extension' })
        accounts.value = await api.requestUsers()
        $store.commit('polkadotWallet/setSelectedAccount', accounts.value[0])
      } catch (e) {
        console.error('requestUsers', e)
        showNotification({ color: 'red', message: e.message || e })
      } finally {
        hideLoading()
      }
    }

    async function onSelectAccount (account) {
      $store.commit('polkadotWallet/setSelectedAccount', account)
    }

    return {
      accounts,
      onSelectAccount,
      selectedAccount
    }
  }
})
</script>

<style lang="sass" scoped>
.main-bg
  background-color: rgba(0,0,0,.05)

.pageBtn:hover

.activeRouter
  color: $primary !important
  background-color: white !important
</style>
