const getAuthenticator = function (ual, wallet = null) {
  wallet = wallet || localStorage.getItem('autoLogin')
  const idx = ual.authenticators.findIndex(auth => auth.constructor.name === wallet)
  return {
    authenticator: ual.authenticators[idx],
    idx
  }
}

export const logoutUser = async function ({ commit }) {
  const { authenticator } = getAuthenticator(this.$ual)
  console.log('logoutUser', authenticator)
  try {
    if (authenticator) {
      await authenticator.logout()
      localStorage.removeItem('autoLogin')
      commit('setAccount', undefined)
    }
  } catch (error) {
    console.error('Authenticator logout error', error)
    throw new Error(error)
  }
}

export const requestUser = async function ({ idx = 0 }) {
  const authenticator = this.$ual.authenticators[idx]
  await authenticator.init()
  localStorage.setItem('autoLogin', authenticator.constructor.name)
  return authenticator.login()
}
