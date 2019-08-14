import { ChartData, ChartOptions } from 'chart.js'
import { ContestHistory } from '@/types/contest-history'

export const createChartDataAndOptions = (username: string, contestHistory: ContestHistory) => {
  const ratedList = contestHistory.filter(contestResult => contestResult.isRated)

  const ratings = ratedList.map(rated => rated.newRating)

  const labels = ratedList.map(rated => `${rated.contestName}`)

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
    legend: {
      display: false,
    },
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

  return {
    data,
    options,
  }
}
