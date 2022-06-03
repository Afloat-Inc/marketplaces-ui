<template lang="pug">
.row.justify-center.q-gutter-sm.linksTabs
  a(href="#" class="linksTabs") Terms of Use
  span &#124;
  a(href="#" class="linksTabs") Privacy Policy
  span &#124;
  a(href="#" class="linksTabs") FAQ
  Logo
</template>

<script>
import Logo from '~/components/common/logo.vue'
export default {
  name: 'LinksTabs',
  components: {
    Logo
  }
}
</script>

<style lang="sass" scoped>
.linksTabs
  font-family: Whitney SSm A,Whitney SSm B
  font-style: normal
  font-size: 1rem
  line-height: 3rem
  font-size: 14px
  font-weight: 600
span
  color: $secondary
  height: 1rem
</style>
