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
    .submission-chart#submission-chart
      v-heading(:text="`Past 7 days daily AC counts (not unique AC)`")
      chart-pane(
        :data="submissionChartData"
        :options="submissionChartOptions"
        :type="`bar`"
        )
</template>

<script lang="ts">
import { ChartData, ChartOptions } from 'chart.js'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { submissionModule } from '@/vuex/modules/submission'
import { contestHistoryModule } from '@/vuex/modules/contest-history'
import { contestInformationModule } from '@/vuex/modules/contest-information'
import UserNameInput from '@/components/organisms/UserNameInput.vue'
import MainPageHeader from '@/components/organisms/MainPageHeader.vue'
import ChartPane from '@/components/organisms/ChartPane.vue'
import VHeading from '@/components/molecules/VHeading.vue'
import { ContestResult, ContestHistory } from '@/types/contest-history'
import { createRatingChart } from '@/libs/rating-chart'
import { createSubmissionChart } from '@/libs/submission-chart'

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

  submissionChartData: ChartData = {}

  submissionChartOptions: ChartOptions = {}

  async onUsernameInput(username: string) {
    const { prepareRatingChart, preapareSubmissionChart } = this

    this.username = username

    if (!username) return

    this.isFetching = true

    await contestInformationModule.fetchContestInformation()

    await prepareRatingChart(username)

    await preapareSubmissionChart(username)

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

  async preapareSubmissionChart(username: string) {
    await submissionModule.fetchSubmissions(username)

    const submissions = submissionModule.getSubmissions

    const { submissionChartData, submissionChartOptions } = createSubmissionChart(submissions || [])

    this.submissionChartData = submissionChartData

    this.submissionChartOptions = submissionChartOptions

    return true
  }
}
</script>

<style scoped lang="scss">
.main-page {
  padding-bottom: 30px;
}

.rating-chart {
  width: 1000px;
  margin: 100px auto 0;
}

.submission-chart {
  width: 1000px;
  margin: 150px auto 0;
}
</style>
