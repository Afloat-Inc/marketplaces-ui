<template lang="pug">
.row.justify-center
  div.text-grey-8.q-pr-sm.contact {{ $t('general.footer.contactTitle') }}:
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
  font-family: 'Whitney SSm A','Whitney SSm B', sans-serif !important
  font-style: normal
  font-weight: 600
  font-size: 1rem
.link
  color: $color-primary !important
</style>
