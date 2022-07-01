<template lang="pug">
#container
  q-card(flat class="card-style")
    q-card-section
      .row.justify-between
        .text-h5 {{market.label}}
    q-card-section
      .text-subtitle2.text-weight-regular.q-py-md {{ $t('pages.marketplace.details.numberPaparticipantsTitle') }}:
        .text-body2 {{participantsNumber}}
      .row.q-col-gutter-md
        .col-6.q-pb-md
          .text-subtitle2.text-weight-regular {{ $t('pages.marketplace.role.administrator') }}
          account-item(
            :address="market.admin?.address"
          )
        .col-6.q-pb-md
          .text-subtitle2.text-weight-regular {{ $t('pages.marketplace.role.owner') }}
          account-item(
            :address="market.owner?.address"
          )    q-separator
    q-card-section(v-if="status === 'Pending'")
      .row.justify-center.q-gutter-md
        .text-subtitle2 {{$t('pages.marketplace.details.pending')}}
    q-card-section(v-else)
      .text-h6(v-if="!isLoggedIn") Please login to apply for this market.
      .container(v-else)
        q-form(ref="applyForm" @submit="onSubmit")
          .text-subtitle1 {{$t('pages.marketplace.applyForm.title')}}
          .text-subtitle2.text-weight-regular(class="q-pb-md") {{$t('pages.marketplace.applyForm.subtitle')}}
          t-input(
            data-cy="notes_input"
            testid="notes_input"
            class="q-mt-md"
            v-model="form.notes"
            :label="$t('pages.marketplace.applyForm.notes.label')"
            :placeholder="$t('pages.marketplace.applyForm.notes.placeholder')"
            :rules="[rules.required]"
          )
          .row.justify-between
            div(class="q-pt-sm text-subtitle2 text-weight-regular") {{$t('pages.marketplace.applyForm.filesTitle')}}
            q-btn.q-mr-sm.q-mb-md(outline no-caps color="secondary" unelevated @click="onMoreFiles") {{ $t('pages.marketplace.applyForm.addFilesButton') }}
          .container(v-for="(file, index, key) in form.files" :key="index")
            .row
              hashed-private-file(
                class="col-11"
                v-model="form.files[index]"
                :index="index"
                :administrator-address="market.admin?.address"
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
          .row.justify-end.q-px-sm
            q-btn(
              type="submit"
              color="secondary"
              outline
              no-caps
              unelevated
              class="q-mt-sm"
              data-cy="submit_apply_btn"
              data-testid="submit_apply_btn"
            ) {{ $t('pages.marketplace.applyForm.submitButton') }}
</template>

<script>
import AccountItem from '~/components/common/account-item.vue'
import { validation } from '~/mixins/validation'
import HashedPrivateFile from '~/components/common/hashedPrivate/hashed-private-file.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MarketApplyForm',
  components: { AccountItem, HashedPrivateFile },
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
  computed: {
    ...mapGetters('polkadotWallet', ['isLoggedIn', 'selectedAccount'])
  },
  watch: {
    'selectedAccount.address': {
      async handler () {
        const isLoggedIn = await this.$store.$hashedPrivateApi.isLoggedIn()
        if (!isLoggedIn) {
          // await this.loginUser()
        }
      }
    }
  },
  methods: {
    ...mapMutations('polkadotWallet', ['setIsLoggedIn']),
    onSubmit () {
      this.$refs.applyForm.validate().then(async () => {
        const files = this.form.files.map(file => {
          console.log(file)
          const cid = file.files[0].value.split(':')[0]
          return {
            displayName: cid,
            cid: file.files[0].value
          }
        })
        const hpNotes = await this.$store.$hashedPrivateApi.shareNew({
          toUserAddress: this.market.admin?.address,
          name: 'Notes',
          description: 'Notes',
          payload: {
            notes: this.form.notes
          }
        })
        const data = {
          notes: hpNotes.sharedData.cid,
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
    },
    async loginUser () {
      try {
        this.showLoading({ message: 'You must be logged in to submit an application' })
        await this.$store.$hashedPrivateApi.login(this.selectedAccount.address)
        this.setIsLoggedIn(true)
      } catch (error) {
        console.error(error)
        this.showNotification({ message: error.message || error, color: 'negative' })
        this.setIsLoggedIn(false)
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
