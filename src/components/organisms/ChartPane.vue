<template lang="pug">
.organism-chart-pane(:style="styles")
  v-chart
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VChart from '@/components/molecules/VChart.vue'

@Component({
  components: {
    VChart,
  },
})
export default class ChartPane extends Vue {
  get styles() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.organism-chart-pane {
  --box-color: #e6e6e6;
  --shadow-color: var(--clear-black);
  --box-shadow1: 0 1px 3px var(--shadow-color), 0 1px 2px var(--shadow-color);
  --box-shadow2: 0 14px 28px var(--shadow-color), 0 10px 10px var(--shadow-color);
  width: 1000px;
  height: 500px;
  margin: 50px auto;
  background: var(--box-color);
  border-radius: 5px;
  box-shadow: var(--box-shadow1);
  transition: all 0.5s ease;
}

.organism-chart-pane:hover {
  box-shadow: var(--box-shadow2);
}
</style>
