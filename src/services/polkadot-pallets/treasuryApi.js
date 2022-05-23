import BasePolkadotApi from '~/services/basePolkadotApi'

class TreasuryApi extends BasePolkadotApi {
  constructor (polkadotApi) {
    super(polkadotApi)
    this.polkadotApi = polkadotApi
    console.log('TreasuryApi created')
  }

  getProposals () {
    return this.polkadotApi.api.derive.treasury.proposals()
  }

  async submitProposal ({ proposer, beneficiary, value }) {
    // Enable web3 plugin and set Signer
    await this.setWeb3Signer(proposer)
    // Call Extrinsic
    return this.polkadotApi.api.tx.treasury.proposeSpend(value, beneficiary).signAndSend(proposer)
    // return this.api.tx.treasury.proposeSpend(value, beneficiary).signAndSend(proposer, { signer: injector.signer })
  }
}

export default TreasuryApi
