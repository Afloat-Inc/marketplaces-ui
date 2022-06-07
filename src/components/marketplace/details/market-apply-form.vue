<template lang="pug">
#container
  q-card(bordered flat)
    q-card-section
      .row.justify-center
        .text-h6 {{market.label}}
    q-card-section
      .row
        .col-6
          .text-subtitle2 Owner
          account-item(:address="market.administrator" flat)
    q-card-section
      q-form(ref="applyForm" @submit="onSubmit")
        .text-h6 Apply for market
        t-input(
          class="q-my-md"
          v-model="form.notes"
          label="Notes"
          placeholder="Notes about your application"
          :rules="[rules.required]"
        )
        t-file(
          class="q-my-md"
          v-model="form.files"
          label="File"
          :rules="[rules.required]"
          )
        q-btn(type="submit" color="primary") Submit
    q-separator
    q-card-section
</template>

<script>
import AccountItem from '~/components/common/account-item.vue'
import { validation } from '~/mixins/validation'
import TFile from '~/components/common/ipfs/ipfs-multi-input.vue'
export default {
  name: 'MarketApplyForm',
  components: { AccountItem, TFile },
  mixins: [validation],
  props: {
    market: {
      type: Object,
      required: true
    }
  },
  emits: ['submit'],
  data () {
    return {
      form: {
        notes: undefined,
        files: undefined
      },
      marketInfo: {
        owner: '',
        taxCredits: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.applyForm.validate().then(() => {
        this.$emit('submit', this.form)
      })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
