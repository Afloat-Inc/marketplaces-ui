<template lang="pug">
.row
  q-img(src="~/assets/afloat-logo.svg" class="logo-icon")
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

<style lang="sass" scoped>
.logo-icon
  width: 50px
  height: 50px
  margin-left: 10px
  margin-right: 0px
.subtitle
  font-family: Whitney SSm A, Whitney SSm B
  font-style: normal
  font-weight: 600
  font-size: 1rem
  margin-top: 2rem
  margin-left: 10px
  margin-right: 10px
a
  color: $primary
a:hover
  color: #007bff
</style>
