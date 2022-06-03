<template lang='pug'>
div
  .text-subtitle3 {{label}}
  q-select(
    outlined
    v-model="content"
    :placeholder="value"
    :options="options"
    emit-value
    map-options
    :dense='dense'
    :rules="[rules.required]"
    @input="$emit('update', content)"
  )
    template(v-slot:selected)
      template(v-if="value")
        | {{value}}
      template(v-else)
        div(style="color: #646464;") {{message}}
</template>

<script>
import { validation } from '~/mixins/validation'

export default {
  name: 'TSelectExtend',
  props: ['value', 'label', 'dense', 'options', 'case', 'message'],
  mixins: [validation],
  model: {
    prop: 'value',
    event: 'update'
  },
  data () {
    return {
      content: this.value
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>

</style>
