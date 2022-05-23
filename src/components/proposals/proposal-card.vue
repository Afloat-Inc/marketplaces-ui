<template lang="pug">
q-card.full-width.q-pa-sm
  .text Proposal Id: {{ id }}
  .text Proposer: {{ proposerNickname }}
  .text Value: {{ proposal.value }}
  .text Beneficiary: {{ beneficiaryNickname }}
  .text Bond: {{ proposal.bond }}
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'ProposalCard',
  props: {
    id: {
      default: () => {},
      type: Object
    },
    proposal: {
      default: () => { },
      type: Object
    },
    council: {
      default: () => [],
      type: Array
    }
  },
  data () {
    return {
      proposerInfo: undefined,
      beneficiaryInfo: undefined
    }
  },
  computed: {
    // ...mapGetters('polkadotWallet', ['api']),
    proposerNickname () {
      return (this.proposerInfo && this.proposerInfo.identity && this.proposerInfo.identity.display) ? this.proposerInfo.identity.display : this.proposal.proposer
    },
    beneficiaryNickname () {
      return (this.beneficiaryInfo && this.beneficiaryInfo.identity && this.beneficiaryInfo.identity.display) ? this.beneficiaryInfo.identity.display : this.proposal.beneficiary
    }
  },
  mounted () {
    this.sync()
  },
  methods: {
    async sync () {
      this.proposerInfo = await this.getAccountInfo(this.proposal.proposer)
      this.beneficiaryInfo = await this.getAccountInfo(this.proposal.beneficiary)
    },
    async getAccountInfo (address) {
      try {
        const r = await this.$store.$treasuryApi.getAccountInfo(address)
        return r
      } catch (e) {
        console.error(e)
        return {
          address
        }
      }
    }
  }
}
</script>
