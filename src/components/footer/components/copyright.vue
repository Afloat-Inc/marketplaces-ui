<template lang="pug">
.row.q-pt-sm.justify-center
  span.copyright
    | © 2019 AFLOAT
    span.sub ®
    | , INC. ALL RIGHTS RESERVED
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
  opacity: 0.2 !important
  font-family: 'Whitney SSm A', 'Whitney SSm B', sans-serif !important
  font-style: italic
  font-size: 0.9rem
  color: $color-neutral-grey-5
  letter-spacing: 0.875px !important
  font-weight: $font-weight-semibold
</style>
