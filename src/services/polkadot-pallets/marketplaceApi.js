import BasePolkadotApi from '~/services/basePolkadotApi'
// import markets from '~/services/const/allMarkets'
// import participants from '~/services/const/participants'
// import applicants from '~/services/const/applicants'
class MarketplaceApi extends BasePolkadotApi {
  constructor (polkadotApi, notify) {
    super(polkadotApi, 'gatedMarketplace', notify)
  }

  /**
   * @name getMarketplaceById
   * @description Get afloat marketplace details
   * @param {Function} subTrigger Function to trigger when subscription detect changes
   * @returns {Object}
   */
  async getMarketplaceById ({ marketId }, subTrigger) {
    const market = await this.exQuery('marketplaces', [marketId])
    if (!market.isEmpty) {
      return market.toHuman()
    }
    return undefined
  }

  /**
   * @name getAuthoritiesByMarketplace
   * @description Get authorities by marketplace
   * @param {String} marketId Marketplace Id
   * @param {String} authTypes Array for types example ['Owner', 'Admin', 'Appraiser']
   * @param {Function} subTrigger Function to trigger when subscription detect changes
   * @returns {Object}
   */
  async getAuthoritiesByMarketplace ({ marketId, authTypes }, subTrigger) {
    const authorities = await this.exEntriesQuery('authoritiesByMarketplace', [marketId])
    const map = this.mapEntries(authorities)
    const authMap = map.map(m => {
      return {
        id: m.id[0],
        type: m.id[1],
        address: m.value[0]
      }
    })
    return authMap
  }

  /**
   * @name getAllMarketplaces
   * @description Get all marketplaces
   * @param {Function} subTrigger Function to trigger when subscription detect changes
   * @returns {Object}
   */
  async getAllMarketplaces (subTrigger) {
    const allIds = await this.exEntriesQuery('marketplaces', undefined)
    return allIds.map(v => {
      return {
        id: v[0].toJSON(),
        value: v[1].toHuman()
      }
    })
  }

  /**
   * @name getParticipantsByMarket
   * @description Get marketplace's participants by market id
   * @param {String} marketId Market id
   * @param {Function} subTrigger Function to trigger when subscription detect changes
   * @returns {Object}
   */
  // async getParticipantsByMarket ({ marketId }, subTrigger) {
  //   return participants
  // }

  async getParticipantsByMarket ({ marketId }, subTrigger) {
    // 1 Get applicants address by Marketplace
    const applicants = await this.exQuery('applicantsByMarketplace', [marketId, 'Approved'])
    console.log('applicants', applicants)
    // Map to human
    const map = this.mapEntries(applicants)
    return map
  }

  /**
   * @name getApplicantsByMarket
   * @description Get marketplace's applicants details by market id
   * @param {String} marketId Market id
   * @param {Function} subTrigger Function to trigger when subscription detect changes
   * @returns {Object}
   */
  async getApplicantsByMarket ({ marketId }, subTrigger) {
    // 1 Get applicants address by Marketplace
    const applicants = await this.exEntriesQuery('applicantsByMarketplace', [marketId])
    // Map to human
    const map = this.mapEntries(applicants)

    // Map applicant addresses by applicant status
    const applicantsByState = map.map(v => {
      return {
        applicantId: v.id[0],
        status: v.id[1],
        addresses: v.value,
        key: v.key
      }
    })
    console.log('applicantsByState', applicantsByState)

    // Applicants address to call in multiquery
    let applicantsAddress = []
    applicantsByState.filter(e => e.status !== 'Approved').forEach(ap => {
      applicantsAddress = applicantsAddress.concat(ap.addresses.map(e => {
        return [
          e,
          marketId
        ]
      }))
    })

    // 2 Get applicants Ids
    const applicantsIds = await this.exMultiQuery('applicationsByAccount', applicantsAddress, subTrigger)
    console.log('applicantsIds', applicantsIds.map(v => v.toHuman()))

    // 3 Get applicant details
    const applicantsDetails = await this.exMultiQuery('applications', applicantsIds.map(v => v.toHuman()), subTrigger)
    console.log('applicantsDetails', applicantsDetails)

    // Add address to applicant details
    const details = applicantsDetails.map((v, i) => {
      return {
        ...v.toHuman(),
        address: applicantsAddress[i][0]
      }
    })
    console.log('details', details)
    return details
  }

  async applyFor ({ marketId, user, notes, files }, subTrigger) {
    console.log('submitApplicationForm', marketId, user, files, notes, subTrigger)
    return this.callTx('apply', user, [marketId, notes, files])
  }

  /**
   *
   * @name enrollApplicant
   * @description enroll to a marketplace
   * @param {String [address]} user User address to sign the transaction
   * @param {String} marketId Market id
   * @param {String} accountOrApplication Application id or account address
   * @param {Boolean} approved Approved or not
   * @param {Function} subTrigger Function to trigger when subscription detect changes
   * @returns {Object}
   */
  async enrollApplicant ({ marketId, user, accountOrApplication, approved }, subTrigger) {
    console.log('enrollApplicant', marketId, user, accountOrApplication, approved, subTrigger)
    return this.callTx('enroll', user, [marketId, accountOrApplication, approved])
  }
  // /**
  //  * @name getXpubByUser
  //  * @description Get Xpub by user
  //  * @param {String} xpubId Xpub id
  //  * @param {Function} subTrigger Function to trigger when subscription detect changes
  //  * @returns {Object}
  //  * { id, xpub }
  //  */
  // getXpubById (xpubId, subTrigger) {
  //   // return this.polkadotApi.api.query.nbvStorage.xpubs(xpubId, subTrigger)
  //   return this.exQuery('xpubs', xpubId, subTrigger)
  // }

  // /**
  //  * @name getVaultsByUser
  //  * @description Get all vaults where user is owner or cosigner
  //  * @param {String} user User address
  //  * @returns {Array} array of vaults Id
  //  * [{ id }]
  //  */
  // getVaultsByUser ({ user, subTrigger }) {
  //   return this.exQuery('vaultsBySigner', user, subTrigger)
  //   // return this.polkadotApi.api.derive.nbvStorage.vaults(user)
  // }

  // /**
  //  * @name getVaultsById
  //  * @description Get an array of vaults details
  //  * @param {String} Ids Array of vaults id
  //  * @param {Function} subTrigger Function to trigger when subscription detect changes
  //  * @returns {Array} list vaults array
  //  * [{ id, description, descriptor, owner, cosigners }]
  //  */
  // getVaultsById ({ Ids, subTrigger }) {
  //   // return this.exQuery('vaults', Ids, subTrigger)
  //   return this.exMultiQuery('vaults', Ids, subTrigger)
  //   // return this.polkadotApi.api.derive.nbvStorage.vaults(user)
  // }

  // /**
  //  * @name createVault
  //  * @description Create a new vault
  //  * @param {String} user user address
  //  * @returns undefined
  //  */
  // async createVault ({ threshold, description, cosigners, user }) {
  //   // Call Extrinsic
  //   return this.callTx('createVault', user, [threshold, description, cosigners])
  // }

  // /**
  // * @name removeVault
  // * @description Remove a vault
  // * @param {String} id Vault id
  // * @returns undefined
  // */
  // async removeVault ({ id, user }) {
  //   // Call Extrinsic
  //   return this.callTx('removeVault', user, [id])
  // }

  // /**
  //  * @name submitXPUB
  //  * @description Set XPUB for a user
  //  * @param {String} user user address
  //  * @returns undefined
  //  */
  // async submitXPUB ({ user, XPUB }) {
  //   // Call Extrinsic
  //   return this.callTx('setXpub', user, [XPUB])
  // }

  // /**
  //  * @name removeXpub
  //  * @description Remove XPUB for a user
  //  * @param {String} user user address
  //  * @returns undefined
  //  */
  // async removeXpub ({ user }) {
  //   // Call Extrinsic
  //   return this.callTx('removeXpub', user)
  // }

  // /**
  //  * @name createProposal
  //  * @description Create new proposal for a vault
  //  * @param {String} signer user address to sign
  //  * @param {String} vaultId vault Id
  //  * @param {String} recipientAddress user address to receive BTC
  //  * @param {String} satoshiAmount Satoshi amount
  //  * @returns undefined
  //  */
  // async createProposal ({ vaultId, recipientAddress, satoshiAmount, signer }) {
  //   // Call Extrinsic
  //   const params = [vaultId, recipientAddress, satoshiAmount]
  //   return this.callTx('propose', signer, params)
  // }
}

export default MarketplaceApi
