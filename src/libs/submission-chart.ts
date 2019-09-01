import 'chartjs-plugin-annotation'
import { ChartData, ChartOptions } from 'chart.js'
import { Submission, Result } from '@/types/submission'
import { contestInformationModule } from '@/vuex/modules/contest-information'
import { ContestInformation } from '@/types/contest-information'

const toYYYYMMDD = (date: Date) => {
  const mm = `0${date.getMonth() + 1}`.slice(-2)

  return `${date.getFullYear()}/${mm}/${date.getDate()}`
}

const getLastWeekLabels = () => {
  const today = new Date()

  const lastWeekLabels = Array(7)
    .fill(0)
    .map((_, i) => {
      const prevDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)

      return toYYYYMMDD(prevDate)
    })

  return lastWeekLabels.reverse()
}

const epochSecondToYYYYMMDD = (epochSecond: number) => toYYYYMMDD(new Date(epochSecond * 1000))

const checkRated = (id: string, contestInformations: ContestInformation[]) => {
  const contest = contestInformations.find(v => v.id === id)

  if (!contest) return false

  return contest.rate_change !== '-'
}

export const createSubmissionChart = async (submissions: Submission[]) => {
  await contestInformationModule.fetchContestInformation()

  const contestInformations = contestInformationModule.getContestInformations || []

  const lastWeekLabels = getLastWeekLabels()

  const lastWeekLabelsSet = new Set(lastWeekLabels)

  const dailyUniqSet = new Set()

  const sorted = submissions.sort((a, b) => a.epoch_second - b.epoch_second)

  const lastWeekSubmissions = sorted.filter((submission, i) => {
    const yyyymmdd = epochSecondToYYYYMMDD(submission.epoch_second)

    const isCountable = lastWeekLabelsSet.has(yyyymmdd) && submission.result === Result.AC

    const isRated = checkRated(submission.contest_id, contestInformations)

    if (i > 0) {
      const lastYYYYMMDD = epochSecondToYYYYMMDD(sorted[i - 1].epoch_second)

      if (lastYYYYMMDD !== yyyymmdd) {
        dailyUniqSet.clear()
      }
    }

    if (isCountable && !dailyUniqSet.has(submission.problem_id) && isRated) {
      dailyUniqSet.add(submission.problem_id)

      return true
    }

    return false
  })

  const ratedPoints = [0, 0, 0, 0, 0, 0, 0]

  lastWeekSubmissions.forEach((submission, i) => {
    const yyyymmdd = epochSecondToYYYYMMDD(submission.epoch_second)

    const idx = lastWeekLabels.indexOf(yyyymmdd)

    ratedPoints[idx] += submission.point
  })

  const submissionChartData: ChartData = {
    labels: lastWeekLabels,
    datasets: [
      {
        label: 'Daily Unique Rated Point Sum',
        type: 'bar',
        data: ratedPoints,
        backgroundColor: '#00a9a5',
      },
    ],
  }

  const submissionChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
    },
    tooltips: {
      displayColors: false,
    },
    hover: {
      mode: 'point',
    },
    scales: {
      xAxes: [
        {
          id: 'x0',
        },
      ],
      yAxes: [
        {
          id: 'y0',
          ticks: {
            min: 0,
          },
        },
      ],
    },
  } as ChartOptions

  return {
    submissionChartData,
    submissionChartOptions,
  }
}
