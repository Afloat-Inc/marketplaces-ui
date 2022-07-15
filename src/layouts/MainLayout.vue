<template lang="pug">
q-layout(view="lHh Lpr lFf")
    q-header(class="bg-primary")
      .row.justify-center
        .col-xs-12.col-sm-12.col-md-12
          q-toolbar(class="bg-primary text-white")
            q-toolbar-title
              q-btn(flat padding="0px 0px 0px 0px" no-caps text-color="primary")
                selected-account-btn(:selectedAccount="selectedAccount")
                accounts-menu(:accounts="availableAccounts" @selectAccount="onSelectAccount" :selectedAccount="selectedAccount")
              q-btn(v-if="!isLoggedIn" @click="loginHP" flat padding="0px 0px 0px 0px" no-caps) {{$t('general.navbar.login')}}
              q-btn(v-else @click="logoutHP" flat padding="0px 0px 0px 0px" no-caps) {{$t('general.navbar.logout')}}
            q-item.routerItems(
              clickable
              :to="{ name: 'home'}"
              exact
              active-class="activeRouter"
              :class="{ 'activeRouter': isActive('Home')}"
              dense
            )
              q-item-section
                q-item-label {{ $t('general.navbar.homeTitle') }}
            q-item.routerItems(
              clickable
              :to="{ name: 'marketplace'}"
              active-class="activeRouter"
              :class="{ 'activeRouter': isActive('Marketplace')}"
              dense
            )
              q-item-section
                q-item-label {{ $t('general.navbar.marketplaceTitle') }}
            q-item.routerItems(
              clickable
              :to="{ name: 'custodian'}"
              active-class="activeRouter"
              :class="{ 'activeRouter': isActive('Custodian')}"
              dense
            )
              q-item-section
                q-item-label {{ $t('general.navbar.custodianTitle') }}
          q-toolbar(class="bg-white text-primary bottomLine")
            q-breadcrumbs(active-color="primary" style="font-size: 16px")
              q-breadcrumbs-el.q-ml-md(v-for="breadcrumb in breadcrumbList" :label="breadcrumb.name" :icon="breadcrumb.icon" :to="breadcrumb.to" :class="{ 'hasLink': !!breadcrumb.to }")
    q-page-container
      .row.justify-center
        .col-10
          .q-px-lg.q-pa-lg.routerViewContainer
            not-connected(v-if="!isConnectedToServer")
            not-accounts(v-else-if="!selectedAccount")
            router-view(v-else)
    //- q-footer
    //- custom-footer.atBottom
</template>

<script>
import { defineComponent, ref, computed, onMounted, watchEffect, watch } from 'vue'
import { useNotifications } from '~/mixins/notifications'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { AccountsMenu, SelectedAccountBtn } from '~/components/common/index.js'
import NotAccounts from '~/pages/NotAccounts.vue'
import CustomFooter from '~/components/footer/custom-footer.vue'
import Logo from '~/components/common/logo.vue'
// import { TreasuryApi } from '~/services/polkadot-pallets'
export default defineComponent({
  name: 'MainLayout',

  components: {
    CustomFooter,
    AccountsMenu,
    SelectedAccountBtn,
    NotAccounts,
    Logo
  },

  setup () {
    const { showNotification, showLoading, hideLoading } = useNotifications()
    const $store = useStore()
    const $route = useRoute()
    const api = $store.$polkadotApi
    const hpApi = $store.$hashedPrivateApi
    const selectedAccount = computed(() => $store.getters['polkadotWallet/selectedAccount'])
    const isConnectedToServer = computed(() => $store.$connectedToServer)
    const availableAccounts = computed(() => $store.getters['polkadotWallet/availableAccounts'])
    const isLoggedIn = computed(() => $store.getters['polkadotWallet/isLoggedIn'])
    const accounts = ref(undefined)
    const breadcrumbList = ref(undefined)
    watch(selectedAccount, (newValue, oldValue) => {
      logoutHP()
    })
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
        showNotification({ color: 'negative', message: e.message || e })
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
    async function loginHP () {
      try {
        showLoading({ message: 'Trying to login using Hashed private, please review polkadot{js} extension' })
        const isLoggedIn = await hpApi.isLoggedIn()
        console.log('isLoggedIn', isLoggedIn)
        $store.commit('polkadotWallet/setIsLoggedIn', isLoggedIn)
        if (!isLoggedIn && selectedAccount.value) {
          await hpApi.login(selectedAccount.value.address)
          await $store.commit('polkadotWallet/setIsLoggedIn', true)
        }
      } catch (e) {
        $store.commit('polkadotWallet/setIsLoggedIn', false)
        console.log('An error ocurred while trying to login using Hashed Private Server ', e)
        showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        hideLoading()
      }
    }
    async function logoutHP () {
      try {
        await hpApi.logout()
        $store.commit('polkadotWallet/setIsLoggedIn', false)
      } catch (e) {
        console.error('onLogout', e)
        showNotification({ message: e.message || e, color: 'negative' })
      }
    }
    return {
      availableAccounts,
      onSelectAccount,
      selectedAccount,
      breadcrumbList,
      isActive,
      signAndVerifyMessage,
      isConnectedToServer,
      isLoggedIn,
      loginHP,
      logoutHP
    }
  }
})
</script>

<style lang="stylus" scoped>
@import '~/css/app.styl'
.routerItems
  border-radius: 5px
  margin: 10px 10px 10px 10px

.routerItems:hover
  background-color: $color-secondary
  color: $color-white
.activeRouter
  color: $color-primary
  background-color: $color-white
.hasLink
  color: $light

.routerViewContainer
  min-height: 50vh
.bottomLine
  border-bottom: 1px solid $color-neutral-grey-2
  padding: 10px 0px 10px 0px
</style>
