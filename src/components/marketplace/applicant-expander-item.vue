<template lang="pug">
q-expansion-item(group="applicants")
  template(v-slot:header)
    .row.full-width.justify-between
      account-item(:address="address" flat inherit)
      q-chip(
        :label="status"
        size="sm"
        :color="getColor"
        class="text-white q-mt-md"
      )
  #body.q-pa-sm
    .text-subtitle1 Notes:
    #notes.q-px-sm
      .text-body2 {{ notes }}
    q-separator(inset).q-my-sm
    .text-subtitle1 Files:
    #files.q-px-sm
      .row.q-col-gutter-xs
        .col-6(v-for="file in files")
          q-card.card-btn(bordered no-shadow v-ripple)
            file-item(v-bind="file")
              //- q-tooltip Click to open file
    .row.q-mt-sm.justify-end.q-gutter-x-sm
      q-btn(
        label="Enroll"
        color="primary"
        size="md"
        no-caps
        @click="enroll"
      )
      q-btn(
        label="Reject"
        color="negative"
        size="md"
        no-caps
        @click="reject"
      )
  slot
</template>

<script>
import { AccountItem } from '~/components/common'
import FileItem from '~/components/common/file/file-item'
/**
 * This component display applicant's info
 */
export default {
  name: 'ApplicantExpanderItem',
  components: { AccountItem, FileItem },
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
    },
    status: {
      type: String,
      default: undefined
    }
  },
  emits: ['onEnroll', 'onReject'],
  computed: {
    getColor () {
      switch (this.status) {
      case 'Pending':
        return 'primary'
      case 'Rejected':
        return 'negative'
      default:
        return 'primary'
      }
    }
  },
  methods: {
    enroll () {
      const data = {
        id: this.id,
        address: this.address,
        notes: this.notes,
        files: this.files
      }
      /**
       * This event is emitted when the user click on enroll button
       */
      this.$emit('onEnroll', data)
    },
    reject () {
      const data = {
        id: this.id,
        address: this.address,
        notes: this.notes,
        files: this.files
      }
      /**
       * This event is emitted when the user click on reject button
       */
      this.$emit('onReject', data)
    }
  }
}
</script>

<style lang="stylus" scoped>
.card-btn:hover
  transform: scale(1.01)
  cursor: pointer
</style>
