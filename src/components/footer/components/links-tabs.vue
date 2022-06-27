<template lang="pug">
.row.justify-center.q-gutter-sm.linksTabs.text-caption
  a(href="#" class="linksTabs") Terms of Use
  span &#124;
  a(href="#" class="linksTabs") Privacy Policy
  span &#124;
  a(href="#" class="linksTabs") FAQ
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

<style lang="stylus" scoped>
@import '~/css/app.styl'
.linksTabs
  color: $color-primary !important
  line-height: 3rem !important
  text-decoration: underline !important
.linksTabs:hover
  color: $color-primary !important
span
  color: $secondary
  height: 1rem
</style>
