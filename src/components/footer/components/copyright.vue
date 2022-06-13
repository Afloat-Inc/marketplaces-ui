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
.sub
  vertical-align: sub
  font-size: 10px
.copyright
  position: relative
  opacity: 0.4
  font-family: Whitney SSm A,Whitney SSm B
  font-style: italic
  font-size: 0.9rem
  color: $grey
</style>
