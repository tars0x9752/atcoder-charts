<template lang="pug">
.organism-user-name-input(:style="styles")
  .flex
    .focus-marker-base
      transition(name="focus-marker")
        .focus-marker(v-if="isFocused")
    .container
      input.input(
        ref="input"
        v-model="inputText"
        type="text"
        spellcheck="false"
        :placeholder="placeholder"
        :maxlength="maxlength"
        @mouseover="onHover"
        @mouseleave="onMouseLeave"
        @focus="onFocus"
        @blur="onBlur"
        )
      .base-border
        .accent-border
  .label-container
    transition(name="label")
      p.label(v-if="isFocused") {{ placeholder }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { submissionModule } from '@/vuex/modules/submission'

const MAX_WIDTH = '100%'
const MIN_WIDTH = '0'
const MAX_OPACITY = '0.7'
const MIN_OPACITY = '0'

@Component
export default class MainPage extends Vue {
  maxlength = 30

  placeholder = 'Username'

  opacity = MAX_OPACITY

  borderWidth = MIN_WIDTH

  inputText = ''

  isFocused = false

  focus() {
    const { input } = this.$refs

    if (input instanceof HTMLElement) {
      input.focus()
    }
  }

  get styles() {
    return {
      '--opacity': this.opacity,
      '--border-width': this.borderWidth,
    }
  }

  onHover() {
    this.borderWidth = MAX_WIDTH
  }

  onMouseLeave() {
    const { isFocused } = this
    if (!isFocused) this.borderWidth = MIN_WIDTH
  }

  onFocus() {
    this.isFocused = true
    this.opacity = MIN_OPACITY
  }

  onBlur() {
    this.isFocused = false
    this.opacity = MAX_OPACITY
    this.borderWidth = MIN_WIDTH
  }
}
</script>

<style scoped lang="scss">
.organism-user-name-input {
  --border-width: initial;
  --opacity: initial;
  --input-height: 50px;
  --input-width: 800px;
  width: var(--input-width);
  margin: 0 auto;
  overflow: hidden;
}

.flex {
  display: flex;
}

.focus-marker-base {
  margin: 0 20px 0 0;
  width: 10px;
  height: calc(var(--input-height) + 2px);
  background: #c4c4c4;
  overflow: hidden;
}

.focus-marker {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    var(--teal),
    var(--teal) 5px,
    var(--white) 5px,
    var(--white) 8px
  );
}

.focus-marker-enter-active,
.focus-marker-leave-active {
  transition: all 0.3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
}
.focus-marker-enter,
.focus-marker-leave-to {
  height: 0;
}

.container {
  width: calc(var(--input-width) - 30px);
}

.input {
  padding: 5px 10px;
  width: 100%;
  height: var(--input-height);
  line-height: var(--input-height);
  color: var(--black);
  background: var(--white);
  border: none;
  font-size: 25px;
  outline: none;
}

.input::placeholder {
  opacity: var(--opacity);
  transition: all 0.35s ease;
}

.base-border {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 2px;
  background: #c4c4c4;
}

.accent-border {
  width: var(--border-width);
  height: 2px;
  background: var(--teal);
  opacity: 1;
  transition: width 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.label {
  margin: 10px 30px;
  padding: 5px;
  width: 100px;
  color: #fff;
  background: var(--deep-teal);
  text-align: center;
  font-size: 16px;
}

.label-enter-active,
.label-leave-active {
  transition: all 0.8s ease;
}
.label-enter,
.label-leave-to {
  opacity: 0;
  margin-left: 50px;
}
</style>
