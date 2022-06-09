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
          account-item(
            :address="market.administrator"
            flat
            shortDisplay
            )
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
        q-btn.q-mr-sm(rounded no-caps color="primary" @click="onMoreFiles") {{'Add files'}}
        .container(v-for="(file, index, key) in form.files" :key="index")
          .row
            ipfs-labeled(
              class="col-11"
              v-model="form.files[index]"
              :index="index"
              @onDelete="onDeleteFile"
              label="File"
              :rules="[rules.required]"
              showDelete
              )
            q-icon(
              rounded
              class="col-1 q-pb-md"
              size="1.5rem"
              name="delete"
              label="delete file"
              color="red"
              @click="onDeleteFile(index)"
            )
        q-btn(type="submit" color="primary" rounded no-caps) Submit
    q-separator
    q-card-section
</template>

<script>
import AccountItem from '~/components/common/account-item.vue'
import { validation } from '~/mixins/validation'
import IpfsLabeled from '~/components/common/ipfs/ipfs-labeled.vue'
export default {
  name: 'MarketApplyForm',
  components: { AccountItem, IpfsLabeled },
  mixins: [validation],
  props: {
    /**
     * This props contains the market information to display [Required]
     * @type {Object}
     */
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
        files: [
          {
            label: undefined,
            files: []
          }
        ]
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
    },
    onMoreFiles () {
      this.form.files.push({
        label: undefined,
        files: []
      })
    },
    async onDeleteFile (index) {
      console.log(index)
      this.form.files.splice(index, 1)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
