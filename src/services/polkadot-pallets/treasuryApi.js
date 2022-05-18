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
    await this.setSigner(proposer)
    // Call Extrinsic
    return this.polkadotApi.api.tx.treasury.proposeSpend(value, beneficiary).signAndSend(proposer)
    // return this.api.tx.treasury.proposeSpend(value, beneficiary).signAndSend(proposer, { signer: injector.signer })
  }

//   async submitProposal ({ proposer, beneficiary, value }) {
//     // Enable web3 plugin
//     await web3Enable(process.env.APP_NAME)
//     // Get injector to call a Extrinsic
//     const injector = await web3FromAddress(proposer)
//     // Call Extrinsics
//     return this.api.tx.treasury.proposeSpend(value, beneficiary).signAndSend(proposer, { signer: injector.signer })
//   }
}

export default TreasuryApi
