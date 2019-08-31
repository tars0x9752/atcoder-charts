<template lang="pug">
.main-page
  main-page-header(
    :title="title"
    )
  user-name-input(
    :margin-top="usernameInputMarginTop"
    :input-width="usernameInputWidth"
    :is-fetching="isFetching"
    @input="onUsernameInput"
    )
  chart-pane(
    v-if="isChartPaneVisible"
    :data="data"
    :options="options"
    )
</template>

<script lang="ts">
import { ChartData, ChartOptions } from 'chart.js'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { submissionModule } from '@/vuex/modules/submission'
import { contestHistoryModule } from '@/vuex/modules/contest-history'
import UserNameInput from '@/components/organisms/UserNameInput.vue'
import MainPageHeader from '@/components/organisms/MainPageHeader.vue'
import ChartPane from '@/components/organisms/ChartPane.vue'
import { ContestResult, ContestHistory } from '@/types/contest-history'
import { createChartDataAndOptions } from '@/libs/chart'

@Component({
  components: {
    UserNameInput,
    ChartPane,
    MainPageHeader,
  },
})
export default class MainPage extends Vue {
  isChartPaneVisible = false

  isFetching = false

  title = 'AtCoder Charts'

  username: string | null = null

  usernameInputMarginTop: string = 'calc(50vh - 140px)'

  usernameInputWidth: string = '900px'

  data: ChartData = {}

  options: ChartOptions = {}

  async onUsernameInput(username: string) {
    this.username = username

    if (!username) return

    this.isFetching = true

    await submissionModule.fetchSubmissions(username)

    await contestHistoryModule.fetchContestHistory(username)

    const contestHistory = contestHistoryModule.getContestHistory

    this.isFetching = false

    if (contestHistory === null) return

    if (contestHistory.length <= 0) return

    const { data, options } = createChartDataAndOptions(username, contestHistory)

    this.data = data

    this.options = options

    this.usernameInputMarginTop = '70px'

    this.usernameInputWidth = '750px'

    this.isChartPaneVisible = true
  }
}
</script>

<style scoped lang="scss">
.main-page {
  padding-bottom: 30px;
}
</style>
