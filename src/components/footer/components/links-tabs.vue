<template lang="pug">
.row.justify-center.q-gutter-sm.linksTabs
  a(href="#" class="linksTabs") {{ $t('general.footer.terms') }}
  span &#124;
  a(href="#" class="linksTabs") {{ $t('general.footer.privacyPolicy') }}
  span &#124;
  a(href="#" class="linksTabs") {{ $t('general.footer.faq') }}
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
  font-family: 'Whitney SSm A', 'Whitney SSm B', sans-serif !important
  color: $color-primary !important
  font-style: italic !important
  line-height: 3rem !important
  font-size: $font-size-menu !important
  font-weight: $font-weight-semibold !important
  text-decoration: underline !important
.linksTabs:hover
  color: $color-primary !important
span
  color: $secondary
  height: 1rem
</style>
