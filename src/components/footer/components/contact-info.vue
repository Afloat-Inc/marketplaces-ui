<template lang="pug">
.row.justify-center
  div.text-grey-8.q-pr-sm.contact Contact:
  a(class="contact link" href="https://t.me/stayafloat" target="_blank") {{'Telegram Link'}}
.row.justify-center
  a(class="contact link" href="mailto:admin@email.io" target="_blank") {{'admin@email.io'}}

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
