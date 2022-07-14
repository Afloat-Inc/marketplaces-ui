import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount'])
  },
  async beforeMount () {
    // const isLoggedIn = this.$store.$hashedPrivateApi.isLoggedIn()
    // if (isLoggedIn) {
    //   await this.loginUser()
    // }
  },
  methods: {
    ...mapMutations('polkadotWallet', ['setIsLoggedIn']),
    async loginUser () {
      try {
        this.showLoading({ message: 'You must be logged in to submit an application' })
        await this.$store.$hashedPrivateApi.login(this.selectedAccount.address)
        this.setIsLoggedIn(true)
      } catch (error) {
        console.error(error)
        this.showNotification({ message: error.message || error, color: 'negative' })
        this.setIsLoggedIn(false)
      } finally {
        this.hideLoading()
      }
    }
  }
}
