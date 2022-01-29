<template lang="pug">
q-page(class="flex flex-center")
    testing-vue-3
</template>

<script>
import { defineComponent } from 'vue';
import TestingVue3 from '../components/testingVue3'

export default defineComponent({
  name: 'PageIndex',
  components: {
    TestingVue3
  }
})
</script>
