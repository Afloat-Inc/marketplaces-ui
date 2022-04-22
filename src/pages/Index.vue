<template lang="pug">
q-page(class="flex flex-center")
  //- .row
  // testing-vue-3
  .row.full-width.justify-center
    .col-6
      polkadot-example.full-width
</template>

<script>
import { defineComponent } from 'vue'
import TestingVue3 from '../components/testingVue3'
import PolkadotExample from '../components/template/polkadot-example'

export default defineComponent({
  name: 'PageIndex',
  components: {
    TestingVue3,
    PolkadotExample
  }
})
</script>
