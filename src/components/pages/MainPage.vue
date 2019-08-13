<template lang="pug">
.main-page
  h1.title {{ title }}
  user-name-input(@input="onUsernameInput")
  chart-pane(
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
import ChartPane from '@/components/organisms/ChartPane.vue'
import { ContestResult, ContestHistory } from '@/types/contest-history'

@Component({
  components: {
    UserNameInput,
    ChartPane,
  },
})
export default class MainPage extends Vue {
  title = 'AtCoder Charts'

  username: string | null = null

  data: ChartData = {}

  options: ChartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
          },
        },
      ],
    },
  }

  async onUsernameInput(username: string) {
    this.username = username

    await submissionModule.fetchSubmissions(username)

    await contestHistoryModule.fetchContestHistory(username)

    const contestHistory = contestHistoryModule.getContestHistory

    this.createChartDataAndOptions(contestHistory)
  }

  createChartDataAndOptions(contestHistory: ContestHistory | null) {
    const { username } = this

    if (contestHistory === null || username === null) return

    const ratedList = contestHistory.filter(contestResult => contestResult.isRated)

    const ratings = ratedList.map(rated => rated.newRating)

    const labels = ratedList.map((_, i) => `${_.contestName}`)

    const itemCount = ratedList.length

    const data: ChartData = {
      labels,
      datasets: [
        {
          label: username,
          type: 'line',
          data: ratings,
          fill: false,
          backgroundColor: '#da4167',
          borderColor: '#da4167',
          borderWidth: 2,
        },
      ],
    }

    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      tooltips: {
        displayColors: false,
        callbacks: {
          afterLabel: tooltipItem => labels[tooltipItem.index!],
        },
      },
      scales: {
        xAxes: [
          {
            ticks: {
              callback: (_, i) => `#${i + 1}`,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              min: 0,
            },
          },
        ],
      },
    }

    this.data = data
    this.options = options
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
