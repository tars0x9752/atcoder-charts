<template lang="pug">
.v-heading(:style="styles")
  h1.text {{ text }}
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component
export default class VHeading extends Vue {
  @Prop({ default: '' })
  text!: string

  @Prop({ default: '40px' })
  height!: string

  get styles() {
    return {
      '--height': this.height,
    }
  }
}
</script>

<style scoped lang="scss">
.v-heading {
  --height: initial;
  margin: 20px 0;
}

.text {
  display: inline-block;
  padding: 0 20px;
  height: var(--height);
  line-height: var(--height);
  background: var(--black);
  border-left: 7px solid var(--deep-pink);
  color: #fff;
  font-size: 20px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
</style>
