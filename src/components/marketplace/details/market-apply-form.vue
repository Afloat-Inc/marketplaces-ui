<template lang="pug">
#container
  q-card(bordered flat)
    q-card-section
      .row.justify-center
        .text-h5 {{market.label}}
    q-card-section
      .row
        .col-6
          .text-h6 Owner
          account-item(
            :address="market.admin.address"
            flat
            )
        .col-6
          .row.justify-end
            .text-h6 Number of participants: {{participantsNumber}}
    q-separator
    q-card-section(v-if="status === 'Pending'")
      .row.q-gutter-md
        .col-12.text-subtitle2 {{$t('pages.marketplace.details.pending')}}
    q-card-section(v-else)
      q-form(ref="applyForm" @submit="onSubmit")
        .text-h6 {{$t('pages.marketplace.applyForm.title')}}
        .text-subtitle2(class="q-pb-md") {{$t('pages.marketplace.applyForm.subtitle')}}
        t-input(
          data-cy="notes_input"
          testid="notes_input"
          class="q-mt-md"
          v-model="form.notes"
          label="Notes"
          placeholder="Notes about your application"
          :rules="[rules.required]"
        )
        .row.justify-between
          div(class="q-pt-sm") {{$t('pages.marketplace.applyForm.filesTitle')}}
          q-btn.q-mr-sm.q-mb-md(rounded no-caps color="primary" @click="onMoreFiles") Add Files
        .container(v-for="(file, index, key) in form.files" :key="index")
          .row
            ipfs-labeled(
              class="col-11"
              v-model="form.files[index]"
              :index="index"
              @onDelete="onDeleteFile"
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
              data-cy="delete_file"
              data-testid="delete_file"
            )
        q-btn(
          type="submit"
          color="primary"
          rounded
          no-caps
          class="q-mt-sm"
          data-cy="submit_apply_btn"
          data-testid="submit_apply_btn"
        ) Submit
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
    },
    /**
     * This props contains the number of participats to display [Required]
     * @type {Object}
     */
    participantsNumber: {
      type: Number,
      required: true,
      default: () => 0
    },
    /**
     * This props contains the status of the application [Required]
     * @type {Array}
     */
    status: {
      type: String,
      required: true,
      default: () => undefined
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
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.applyForm.validate().then(() => {
        const files = this.form.files.map(file => {
          return {
            displayName: file.label,
            cid: file.files[0].value
          }
        })
        const data = {
          notes: this.form.notes,
          files
        }
        this.$emit('submit', data)
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
