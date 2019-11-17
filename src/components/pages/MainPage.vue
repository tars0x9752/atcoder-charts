<template lang="pug">
.main-page
  main-page-header#top(
    :title="title"
    )
  user-name-input(
    :margin-top="usernameInputMarginTop"
    :input-width="usernameInputWidth"
    :is-fetching="isFetching"
    @input="onUsernameInput"
    )
  .charts(v-if="isChartPaneVisible")
    .rating-chart#rating-chart
      v-heading(:text="`Rating and Performance History`")
      chart-pane(
        :data="ratingChartData"
        :options="ratingChartOptions"
        :type="`line`"
        )
</template>

<script lang="ts">
import { ChartData, ChartOptions } from 'chart.js'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { contestHistoryModule } from '@/vuex/modules/contest-history'
import UserNameInput from '@/components/organisms/UserNameInput.vue'
import MainPageHeader from '@/components/organisms/MainPageHeader.vue'
import ChartPane from '@/components/organisms/ChartPane.vue'
import VHeading from '@/components/molecules/VHeading.vue'
import { ContestHistory } from '@/types/contest-history'
import { createRatingChart } from '@/libs/rating-chart'

@Component({
  components: {
    UserNameInput,
    ChartPane,
    MainPageHeader,
    VHeading,
  },
})
export default class MainPage extends Vue {
  isChartPaneVisible = false

  isFetching = false

  title = 'AtCoder Charts'

  username: string | null = null

  usernameInputMarginTop: string = 'calc(50vh - 140px)'

  usernameInputWidth: string = '900px'

  ratingChartData: ChartData = {}

  ratingChartOptions: ChartOptions = {}

  async onUsernameInput(username: string) {
    const { prepareRatingChart } = this

    this.username = username

    if (!username) return

    this.isFetching = true

    await prepareRatingChart(username)

    this.isFetching = false

    this.usernameInputMarginTop = '40px'

    this.usernameInputWidth = '750px'

    this.isChartPaneVisible = true
  }

  async prepareRatingChart(username: string) {
    await contestHistoryModule.fetchContestHistory(username)

    const contestHistory = contestHistoryModule.getContestHistory

    const { ratingChartData, ratingChartOptions } = createRatingChart(contestHistory || [])

    this.ratingChartData = ratingChartData

    this.ratingChartOptions = ratingChartOptions
  }
}
</script>

<style scoped lang="scss">
.main-page {
  padding-bottom: 30px;
}

.rating-chart {
  width: 1000px;
  margin: 100px auto;
}
</style>
