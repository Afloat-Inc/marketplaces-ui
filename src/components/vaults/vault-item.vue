<template lang="pug">
q-card.q-pa-sm
  q-item
    q-item-section
      //- .text-subtitle2 Id:
      //-   span.text-body2.one-line.q-ml-sm {{ vaultId }}
      .row.items-center
        q-icon.q-mr-md(name="description" size="sm" color="secondary")
        .text-subtitle2 Description:
          span.text-body2.q-ml-sm {{ description }}
      .row.items-center
        q-icon.q-mr-md(name="people" size="sm" color="secondary")
        .text-subtitle2 Threshold:
          span.text-body2.q-ml-sm {{ threshold }}
      .text-subtitle2 Owner
      account-item(:address="owner" flat)
    q-item-section(avatar)
      q-btn(
        label="See details"
        icon="summarize"
        no-caps
        size="sm"
        color="secondary"
        @click="goToVaultDetails"
      )
</template>

<script>
import { AccountItem } from '~/components/common'
export default {
  name: 'VaultItem',
  components: { AccountItem },
  props: {
    vaultId: {
      type: String,
      default: undefined
    },
    cosigners: {
      type: Array,
      default: () => []
    },
    description: {
      type: String,
      default: undefined
    },
    descriptors: {
      type: Object,
      default: () => {}
    },
    owner: {
      type: String,
      default: undefined
    },
    threshold: {
      type: [String, Number],
      default: undefined
    }
  },
  methods: {
    goToVaultDetails () {
      const vault = {
        vaultId: this.vaultId,
        cosigners: this.cosigners,
        description: this.description,
        outputDescriptor: this.descriptors.outputDescriptor,
        changeDescriptor: this.descriptors.changeDescriptor,
        owner: this.owner,
        threshold: this.threshold
      }
      this.$router.push({
        name: 'vaultDetails',
        params: vault
      })
    }
  }
}
</script>
