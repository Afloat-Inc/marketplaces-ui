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
            :to="{ name: 'home'}"
            exact
            active-class="activeRouter"
            :class="{ 'activeRouter': isActive('Home')}"
            dense
          )
            q-item-section
              q-item-label Home
          q-item.routerItems(
            clickable
            :to="{ name: 'marketplace'}"
            active-class="activeRouter"
            :class="{ 'activeRouter': isActive('Marketplace')}"
            dense
          )
            q-item-section
              q-item-label Marketplace
          q-item.routerItems(
            clickable
            dense
            @click="signAndVerifyMessage"
          )
            q-item-section
              q-item-label Sign and Verify Message
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

    async function signAndVerifyMessage () {
      try {
        showLoading()
        const message = 'Test To Sign'
        const response = await $store.$nbvStorageApi.signMessage(message, selectedAccount.value.address)
        console.log('signMessage', response)
        const response2 = await $store.$nbvStorageApi.verifyMessage(message, response.signature, selectedAccount.value.address)
        console.log('verifyMessage', response2)
        if (response2.isValid) {
          showNotification({ message: 'Message Signed and Verified' })
        }
      } catch (e) {
        console.error('error', e)
        showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        hideLoading()
      }
    }

    return {
      availableAccounts,
      onSelectAccount,
      selectedAccount,
      breadcrumbList,
      isActive,
      signAndVerifyMessage
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
