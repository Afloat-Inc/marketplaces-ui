<template lang="pug">
#container
  q-card(flat class="card-style")
    q-card-section
      .row.justify-center
        .text-h2 {{market.label}}
    q-card-section
      .row
        .col-7.q-pb-md
          .label Administrator
          account-item(
            :address="market.admin?.address"
            flat
          )
        .col-5
          .row.justify-end
            .label Number of participants: {{participantsNumber}}

      .row
        .col-7.q-pb-md
          .label Owner
          account-item(
            :address="market.owner?.address"
            flat
          )    q-separator
    q-card-section(v-if="status === 'Pending'")
      .row.justify-center.q-gutter-md
        .text-h5 {{$t('pages.marketplace.details.pending')}}
    q-card-section(v-else)
      q-form(ref="applyForm" @submit="onSubmit")
        .text-h4 {{$t('pages.marketplace.applyForm.title')}}
        .text-h5(class="q-pb-md") {{$t('pages.marketplace.applyForm.subtitle')}}
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
          div(class="q-pt-sm label") {{$t('pages.marketplace.applyForm.filesTitle')}}
          q-btn.q-mr-sm.q-mb-md(outline no-caps color="secondary" unelevated @click="onMoreFiles") Add Files
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
              class="col-1 q-pb-md cursor-pointer"
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
          color="secondary"
          outline
          no-caps
          unelevated
          class="q-mt-sm"
          data-cy="submit_apply_btn"
          data-testid="submit_apply_btn"
        ) Submit
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
