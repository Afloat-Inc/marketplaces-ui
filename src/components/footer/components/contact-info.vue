<template lang="pug">
.row.justify-center
  div.text-grey-8.q-pr-sm.contact Contact:
  a(class="contact" href="https://t.me/stayafloat" target="_blank") {{'Telegram Link'}}
.row.justify-center
  a(class="contact" href="mailto:admin@stayafloat.io" target="_blank") {{'admin@stayafloat.io'}}

</template>

<script>
export default {
  name: 'ContactInfo'
}
</script>

<style lang="sass" scoped>
.contact
  font-family: Whitney SSm A,Whitney SSm B
  font-style: normal
  font-weight: 600
  font-size: 1rem
</style>
