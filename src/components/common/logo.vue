<template lang="pug">
.row
  q-img(:src="require('~/assets/afloat-logo.svg')" class="logo-icon")
  span(v-if="includeSubtitle" class="subtitle")
    a The TAXGIVING&reg; Company
</template>

<script>
export default {
  name: 'Logo',
  props: {
    includeSubtitle: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.logo-icon
  width: 50px
  height: 50px
  margin-left: 10px
  margin-right: 0px
.subtitle
  font-family: 'Whitney SSm A', 'Whitney SSm B', sans-serif
  font-style: normal
  font-weight: 600
  font-size: 1.1rem
  margin-top: 1.6rem
  margin-left: 10px
  margin-right: 10px
a
  color: #2EB7E5 !important
a:hover
  color: #0056b3 !important
  text-decoration: none
</style>
