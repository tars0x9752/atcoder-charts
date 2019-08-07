<template lang="pug">
.chart-view
  h3.message {{ title }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  title = 'グラフ閲覧'
}
</script>

<style scoped lang="scss"></style>
