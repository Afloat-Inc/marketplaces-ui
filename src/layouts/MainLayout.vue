<template lang="pug">
q-layout(view="lHh Lpr lFf")
    q-header
      q-toolbar
        q-btn(flat padding="0px 0px 0px 0px" no-caps text-color="white")
          selected-account-btn(:selectedAccount="selectedAccount")
          accounts-menu(:accounts="availableAccounts" @selectAccount="onSelectAccount" :selectedAccount="selectedAccount")
        .row.q-gutter-x-sm
          q-item.routerItems(
            clickable
            :to="{ name: 'manageVaults'}"
            active-class="activeRouter"
            :class="{ 'activeRouter': isActive('Vaults')}"
            dense
          )
            q-item-section
              q-item-label Vaults
          q-item.routerItems(
            clickable
            :to="{ name: 'manageXpub'}"
            active-class="activeRouter"
            :class="{ 'activeRouter': isActive('XPUB')}"
            dense
          )
            q-item-section
              q-item-label XPUB
        //- q-toolbar-title.q-ml-md Hashed Template App
        //- div Quasar v{{ $q.version }}
      q-toolbar(class="bg-white text-primary")
        q-breadcrumbs(active-color="primary" style="font-size: 16px")
          q-breadcrumbs-el.q-ml-md(v-for="breadcrumb in breadcrumbList" :label="breadcrumb.name" :icon="breadcrumb.icon" :to="breadcrumb.to" :class="{ 'hasLink': !!breadcrumb.to }")

    q-page-container
      .row.justify-center
        .col-10
          .q-px-lg.q-pa-lg
            not-accounts(v-if="!selectedAccount")
            router-view(v-else)
</template>

<script>
import { defineComponent, ref, computed, onMounted, watchEffect } from 'vue'
import { useNotifications } from '~/mixins/notifications'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { AccountsMenu, SelectedAccountBtn } from '~/components/common/index.js'
import NotAccounts from '~/pages/NotAccounts.vue'
// import { TreasuryApi } from '~/services/polkadot-pallets'
export default defineComponent({
  name: 'MainLayout',

  components: {
    AccountsMenu,
    SelectedAccountBtn,
    NotAccounts
  },

  setup () {
    const { showNotification, showLoading, hideLoading } = useNotifications()
    const $store = useStore()
    const $route = useRoute()
    const api = $store.$polkadotApi
    const selectedAccount = computed(() => $store.getters['polkadotWallet/selectedAccount'])
    const availableAccounts = computed(() => $store.getters['polkadotWallet/availableAccounts'])
    const accounts = ref(undefined)
    const breadcrumbList = ref(undefined)
    watchEffect(() => updateBreadcrumbs($route))

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
        $store.commit('polkadotWallet/setAvailableAccounts', accounts.value)
        $store.commit('polkadotWallet/setSelectedAccount', accounts.value[0])
      } catch (e) {
        console.error('requestUsers', e)
        showNotification({ color: 'red', message: e.message || e })
      } finally {
        hideLoading()
      }
    }

    function onSelectAccount (account) {
      $store.commit('polkadotWallet/setSelectedAccount', account)
    }

    function updateBreadcrumbs (v) {
      breadcrumbList.value = v.meta.breadcrumb
    }

    function isActive (module) {
      if (module && breadcrumbList.value.length > 0) {
        const fund = breadcrumbList.value.find(v => v.name === module)
        return !!fund
      }
      return false
    }

    return {
      availableAccounts,
      onSelectAccount,
      selectedAccount,
      breadcrumbList,
      isActive
    }
  }
})
</script>

<style lang="sass" scoped>

.routerItems
  border-radius: 5px

.routerItems:hover
  background-color: $secondary
  color: white

.activeRouter
  color: $primary
  background-color: white

.hasLink
  color: $light
</style>
