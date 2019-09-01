import 'chartjs-plugin-annotation'
import { ChartData, ChartOptions } from 'chart.js'
import { Submission, Result } from '@/types/submission'

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

export const createSubmissionChart = (submissions: Submission[]) => {
  const lastWeekLabels = getLastWeekLabels()

  const lastWeekLabelsSet = new Set(lastWeekLabels)

  const lastWeekSubmissions = submissions.filter((submission, i) => {
    const yyyymmdd = epochSecondToYYYYMMDD(submission.epoch_second)

    return lastWeekLabelsSet.has(yyyymmdd) && submission.result === Result.AC
  })

  const acCounts = [0, 0, 0, 0, 0, 0, 0]

  lastWeekSubmissions.forEach((submission, i) => {
    const yyyymmdd = epochSecondToYYYYMMDD(submission.epoch_second)

    const idx = lastWeekLabels.indexOf(yyyymmdd)

    acCounts[idx] += 1
  })

  const submissionChartData: ChartData = {
    labels: lastWeekLabels,
    datasets: [
      {
        label: 'Total AC Counts',
        type: 'bar',
        data: acCounts,
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
