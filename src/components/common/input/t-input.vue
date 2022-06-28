<template lang='pug'>
div
  .label {{label}}
  q-input(
    outlined
    v-model="content"
    :placeholder="placeholder"
    :debounce="debounce"
    :type="typeProp"
    :autofocus="autofocus"
    :dense='dense'
    :rules="rules"
    :autogrow='autogrow'
    :mask="mask"
    :fill-mask="fillMask"
    :hint='hint'
    :data-testid="testid"
  )
    slot(name='append' class="centerIcon")
</template>

<script>
export default {
  name: 'Tinput',
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    /**
     * The value of the input
     * @type {String}
     * @default ''
     * @required
     */
    modelValue: {
      type: String,
      default: '',
      required: true
    },
    /**
     * The label of the input
     * @type {String}
     * @default 'empty string'
     * @required
     */
    label: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/prop-name-casing
    testid: {
      type: String,
      default: ''
    },
    /**
     * The rules of the input
     * @type {Array}
     * @default []
     * @required
     */
    rules: {
      type: Array,
      default: () => []
    },
    /**
     * The hint of the input
     * @type {String}
     * @default ''
     * @required
     */
    hint: {
      type: String,
      default: ''
    },
    /**
     * The placeholder of the input
     * @type {String}
     * @default ''
     * @required
     */
    placeholder: {
      type: String,
      default: ''
    },
    /**
     * The type of the input
     * @type {String}
     * @default 'text'
     * @required
     */
    type: {
      type: String,
      default: 'text'
    },
    /**
     * The debounce of the input
     * @type {Number}
     * @default 0
     * @required
     */
    debounce: {
      type: Number,
      default: 0
    },
    /**
     * The autofocus of the input
     * @type {Boolean}
     * @default false
     * @required
     */
    autofocus: {
      type: Boolean,
      default: false
    },
    /**
     * The dense of the input
     * @type {Boolean}
     * @default false
     * @required
     */
    dense: {
      type: Boolean,
      default: false
    },
    /**
     * The autogrow of the input
     * @type {Boolean}
     * @default false
     * @required
     */
    autogrow: {
      type: Boolean,
      default: false
    },
    /**
     * The mask of the input
     * @type {String}
     * @default ''
     * @required
     */
    mask: {
      type: String,
      default: ''
    },
    /**
     * The fill mask of the input
     * @type {Boolean}
     * @default false
     * @required
     */
    fillMask: {
      type: Boolean,
      default: false
    },
    /**
     * The color of the input
     * @type {String}
     * @default ''
     */
    color: {
      type: String,
      default: ''
    },
    /**
     * The type of the input
     * @type {String}
     * @default 'text'
     */
    typeProp: {
      type: String,
      default: 'text'
    },
    /**
     * InputFormatting
     * @type {Boolean}
     * @default false
     */
    inputFormatting: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      content: this.modelValue
    }
  },
  watch: {
    content: async function (newVal, oldVal) {
      if (this.inputFormatting) {
        this.formatContent(this.content, oldVal, newVal)
      }
      this.$emit('update:modelValue', this.content)
    }
  },
  methods: {
    formatContent (content, oldVal, newVal) {
      if (newVal.match(/[^a-zA-Z0-9\s]/g)) {
        this.content = oldVal
      } else {
        this.content = this.content.toLowerCase()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.q-field__marginal
  font-size: 16px
.colorTailwind
  color: #374157
</style>
