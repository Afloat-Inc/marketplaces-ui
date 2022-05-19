<template lang="pug">
#container
  .text-h5.q-mb-md Manage XPUB
  .text-body2.text-weight-light.q-mb-lg {{ $t('general.lorem')  }}
  q-card(v-if="userHasXpub")
    q-item
      q-item-section
        .one-line {{ userXpub }}
      q-item-section(avatar)
        q-icon.icon-btn(
          v-ripple
          round
          name="delete"
          color="negative"
          @click="removeXpub"
        )
          q-tooltip Remove your XPUB
  set-xpub-form(v-else :userAddress="selectedAccount.address" @submitted="setXpub")
</template>

<script>
import SetXpubForm from '~/components/xpub/set-xpub-form'
import { mapGetters } from 'vuex'

export default {
  name: 'ManageXpub',
  components: {
    SetXpubForm
  },
  data () {
    return {
      userXpub: undefined
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount']),
    userHasXpub () {
      return !!this.userXpub
      // xpub.isEmpty ? undefined : xpub.value
    }
  },
  watch: {
    async selectedAccount () {
      this.getXpub()
    }
  },
  mounted () {
    this.getXpub()
  },
  methods: {
    async getXpub () {
      try {
        this.showLoading()
        await new Promise((resolve) => {
          setTimeout(() => {
            console.warn('sleeping')
            resolve()
          }, 2000)
        })
        this.userXpub = undefined
        const xpubId = await this.$store.$nbvStorageApi.getXpubByUser(this.selectedAccount.address)
        if (xpubId && xpubId.value) {
          const xpub = await this.$store.$nbvStorageApi.getXpubById(xpubId.value)
          this.userXpub = xpub.isEmpty ? undefined : xpub.value
        } else this.userXpub = undefined
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async setXpub (payload) {
      try {
        this.showLoading({ message: this.$t('general.waitingWeb3') })
        await this.$store.$nbvStorageApi.submitXPUB({
          user: this.selectedAccount.address,
          XPUB: payload.XPUB
        })
        await this.getXpub()
        this.showNotification({ message: 'Your XPUB was added' })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async removeXpub () {
      try {
        this.showLoading({ message: this.$t('general.waitingWeb3') })
        await this.$store.$nbvStorageApi.removeXpub({ user: this.selectedAccount.address })
        await this.getXpub()
        this.showNotification({ message: 'Your XPUB was removed' })
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
