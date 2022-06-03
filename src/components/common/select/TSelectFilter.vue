<template lang="pug">
div
  div( v-if="message" class="q-pb-sm text-caption") {{message}}
  q-select(
    data-cy='docType'
    :rules="rules"
    outlined,
    dense
    v-model="content",
    use-input,
    :placeholder="placeholder"
    :input-debounce="debounce",
    :options="options",
    @filter="filterFn",
    @input="$emit('update', content)"
    @new-value="createValue"
  )
    template(v-slot:no-option )
      q-item
        q-item-section.text-grey
          | No results
</template>
<script>
export default {
  name: 'TSelectFilter',
  props: ['value', 'message', 'dense', 'stringOptions', 'debounce', 'placeholder', 'rules'],
  model: {
    prop: 'value',
    event: 'update'
  },
  data () {
    return {
      options: this.stringOptions,
      content: this.value
    }
  },
  methods: {
    createValue (val, done) {
      if (val.length > 2) {
        if (!this.stringOptions.includes(val)) {
          done(val, 'add-unique')
        }
      }
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.stringOptions
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
<style lang="stylus" scoped></style>
