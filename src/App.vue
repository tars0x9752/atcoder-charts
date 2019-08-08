<template lang="pug">
.app
  router-view
</template>

<script lang="ts">
import '@/styles/simple-reset.css'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class App extends Vue {
  errorCaptured(error: Error) {
    console.log(error)
  }
}
</script>

<style lang="scss">
.app {
  height: 100vh;
  color: #202c39;
  background: #fff;
  overflow: hidden;
}
</style>
