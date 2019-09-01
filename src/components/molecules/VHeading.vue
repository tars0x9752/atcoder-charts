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

  @Prop({ default: '25px' })
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
  width: 100%;
}

.text {
  --height: initial;
  width: 100%;
  height: var(--height);
  margin: 0;
  color: var(--black);
  font-size: 20px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
}
</style>
