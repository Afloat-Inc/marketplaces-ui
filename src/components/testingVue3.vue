<script>
export default {
  name: 'TestingVue3',
  methods: {
    lorem(){
      const test = 'gola'
      return lorem
    }
  }
}
</script>

<template lang="pug">
div
    .text-bold.test.global-font This is a test component
</template>

<style lang="stylus">
.test
  color: green
</style>
