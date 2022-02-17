<template>
  <button type="button" :class="classes" :style="style" @click="onClick">{{ label2 }}</button>
</template>

<script>
import './button.css'
import { reactive, computed } from 'vue'

export default {
  name: 'MyButton',

  props: {
    label: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    primary: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1
      },
      default () {
        return ''
      }
    },
    backgroundColor: {
      type: String,
      default () {
        return ''
      }
    }
  },

  emits: ['click'],

  setup (props, { emit }) {
    props = reactive(props)
    const label2 = reactive(props.label)
    return {
      classes: computed(() => ({
        'storybook-button': true,
        'storybook-button--primary': props.primary,
        'storybook-button--secondary': !props.primary,
        [`storybook-button--${props.size || 'medium'}`]: true
      })),
      style: computed(() => ({
        backgroundColor: props.backgroundColor
      })),
      onClick () {
        emit('click')
      },
      label2
    }
  }
}
</script>
