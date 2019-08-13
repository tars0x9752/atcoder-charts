<template lang="pug">
.main-page
  h1.title {{ title }}
  user-name-input(@input="onTextInput")
  chart-pane
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { submissionModule } from '@/vuex/modules/submission'
import { contestHistoryModule } from '@/vuex/modules/contest-history'
import UserNameInput from '@/components/organisms/UserNameInput.vue'
import ChartPane from '@/components/organisms/ChartPane.vue'

@Component({
  components: {
    UserNameInput,
    ChartPane,
  },
})
export default class MainPage extends Vue {
  title = 'AtCoder Charts'

  async onTextInput(text: string) {
    await submissionModule.fetchSubmissions(text)

    await contestHistoryModule.fetchContestHistory(text)

    console.log(submissionModule.getSubmissions)

    console.log(contestHistoryModule.getContestHistory)
  }
}
</script>

<style scoped lang="scss">
.title {
  padding: 25px;
  margin-bottom: 30px;
  background: var(--black);
  color: #fff;
  font-size: 35px;
  font-family: 'Righteous', cursive;
  text-align: center;
}

.msg {
  text-align: center;
  font-size: 16px;
}
</style>
