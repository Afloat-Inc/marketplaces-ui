<template lang="pug">
.row.justify-center.text-caption
  div.text-grey-8.q-pr-sm.contact Contact:
  a(class="contact link" href="mailto:hello@hashed.io" target="_blank") {{'hello@hashed.io'}}

</template>

<script>
export default {
  name: 'ContactInfo'
}
</script>

<style lang="stylus" scoped>
@import '~/css/app.styl'
.contact
  font-style: normal
.link
  color: $color-primary !important
</style>
