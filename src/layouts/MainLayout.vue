<template lang="pug">
q-layout(view="lHh Lpr lFf")
    q-header
      q-toolbar
        q-btn(flat padding="0px 0px 0px 0px" no-caps text-color="white")
          selected-account-btn(:selectedAccount="selectedAccount")
          accounts-menu(:accounts="accounts" @selectAccount="onSelectAccount" :selectedAccount="selectedAccount")
        .row.q-gutter-x-sm
          q-item.routerItems(
            clickable
            :to="{ name: 'vaultsList'}"
            active-class="activeRouter"
            :class="{ 'activeRouter': isActive('Vaults')}"
            dense
          )
            q-item-section
              q-item-label Vaults
          q-item.routerItems(
            clickable
            :to="{ name: 'polkadot-example'}"
            active-class="activeRouter"
            :class="{ 'activeRouter': isActive('Examples')}"
            dense
          )
            q-item-section
              q-item-label Examples
        //- q-toolbar-title.q-ml-md Hashed Template App
        //- div Quasar v{{ $q.version }}
      q-toolbar(class="bg-white text-primary")
        q-breadcrumbs(active-color="primary" style="font-size: 16px")
          q-breadcrumbs-el.q-ml-md(v-for="breadcrumb in breadcrumbList" :label="breadcrumb.name" :icon="breadcrumb.icon" :to="breadcrumb.to" :class="{ 'hasLink': !!breadcrumb.to }")

    q-page-container
      .row.justify-center
        .col-10
          .q-pa-lg
            router-view
</template>

<script>
import { defineComponent, ref, computed, onMounted, watchEffect } from 'vue'
import { useNotifications } from '~/mixins/notifications'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
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
    const $route = useRoute()
    const api = $store.$polkadotApi
    const selectedAccount = computed(() => $store.getters['polkadotWallet/selectedAccount'])
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
      accounts,
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
