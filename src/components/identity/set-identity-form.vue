<template lang="pug">
.q-pa-xl.q-gutter-y-md
    q-btn.float-right(
        icon="close"
        round
        color="negative"
        v-close-popup
        size="md"
    )
    .text-h4.q-mb-lg Set identity
    .row.items-center.q-col-gutter-md.q-my-sm
        q-input.full-width(
            outlined
            label="Xpub Key"
            v-model="xpubKey"
            readonly
        )
        q-input.full-width(
            outlined
            label="Display"
        )
        q-input.full-width(
            outlined
            label="Legal"
        )
        q-input.full-width(
            outlined
            label="Riot"
        )
        q-input.full-width(
            outlined
            label="Email"
        )
        .row.q-mt-md
            q-btn.float-right.q-mb-md(
                label="Set Identity"
                color="primary"
                size="lg"
            )
</template>

<script>
export default {
  name: 'SetIdentityForm',
  props: {
    xpubKey: {
      type: String,
      default: undefined
    }
  }
}
</script>
