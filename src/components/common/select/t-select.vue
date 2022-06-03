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
        | {{getDataType(content)}}
      template(v-else)
        div(style="color: #646464;") {{'Choose direction'}}
</template>

<script>
import { validation } from '~/mixins/validation'

export default {
  name: 'Tselect',
  props: ['value', 'label', 'dense', 'options', 'case'],
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
    getDataType (val) {
      const types = {
        c: 'Checksum256',
        n: 'Name',
        a: 'Asset',
        t: 'Time',
        s: 'String',
        i: 'Int64',
        sd: 'File'
      }
      return types[val]
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
