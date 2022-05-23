<template lang="pug">
.fullscreen.bg-blue.text-white.text-center.q-pa-md.flex.flex-center
  div
    div(style="font-size: 30vh")
      | 404
    .text-h2(style="opacity:.4")
      | Oops. Nothing here...
    q-btn.q-mt-xl(color="white" text-color="blue" unelevated="" to="/" label="Go Home" no-caps="")
    //- TestingVue3
</template>

<script>
import { defineComponent } from 'vue'
// import TestingVue3 from '~/components/testingVue3.vue'
export default defineComponent({
  name: 'Error404'
  // components: { TestingVue3 }
})
</script>
