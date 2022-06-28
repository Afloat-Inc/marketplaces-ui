<template lang="pug">
.row.q-pt-sm.justify-center
  span.copyright.text-uppercase
    | © 2022 {{ $t('general.footer.copyright') }}
    span.sub ®
    | , {{ $t('general.footer.sub') }}
</template>

<script>
export default {
  name: 'Copyright'
}
</script>

<style lang="stylus" scoped>
@import '~/css/app.styl'
.sub
  vertical-align: sub
  font-size: 10px
.copyright
  position: relative !important
  opacity: 0.3 !important
  font-style: italic
  font-size: 0.9rem
  color: black
  letter-spacing: 0.875px !important
</style>
