<template lang="pug">
q-expansion-item(group="applicants")
    template(v-slot:header)
        account-item.full-width(:address="address" flat inherit)
    #body.q-pa-sm
        .text-body2 {{ notes }}
</template>

<script>
import { AccountItem } from '~/components/common'
/**
 * This component display applicant's info
 */
export default {
  name: 'ApplicantExpanderItem',
  components: { AccountItem },
  props: {
    id: {
      type: String,
      default: undefined
    },
    address: {
      type: String,
      default: undefined
    },
    notes: {
      type: String,
      default: undefined
    },
    files: {
      type: Array,
      default: () => []
    }
  }
}
</script>
