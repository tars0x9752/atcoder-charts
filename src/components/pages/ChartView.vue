<template lang="pug">
.chart-view
  h3.message {{ title }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { submissionModule } from '@/vuex/modules/submission'

@Component
export default class HelloWorld extends Vue {
  title = 'グラフ閲覧'

  mounted() {
    submissionModule.fetchSubmissions('HaveFunWP')
  }
}
</script>

<style scoped lang="scss"></style>
