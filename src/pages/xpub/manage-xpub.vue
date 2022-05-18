<template lang="pug">
#container
  .text-h5.q-mb-md Manage XPUB
  .text-body2.text-weight-light.q-mb-lg {{ $t('general.lorem')  }}
  .row.justify-center
    .col-6
  set-xpub-form
</template>

<script>
import SetXpubForm from '~/components/xpub/set-xpub-form'
export default {
  name: 'ManageXpub',
  components: {
    SetXpubForm
  }
}
</script>
