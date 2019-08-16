import 'chartjs-plugin-annotation'
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
        backgroundColor: '#00a9a5',
        borderColor: '#00a9a5',
        borderWidth: 2,
      },
    ],
  }

  const createRegion = (
    yMin: number,
    yMax: number,
    backgroundColor: string,
    borderColor: string
  ) => ({
    type: 'box',
    xScaleID: 'x0',
    yScaleID: 'y0',
    xMin: labels[0],
    xMax: labels[labels.length - 1],
    yMin,
    yMax,
    backgroundColor,
    borderColor,
    borderWidth: 0,
  })

  const brownRegion = createRegion(400, 799, '#AF81691A', '#AF816900')

  const grennRegion = createRegion(800, 1199, '#419D781A', '#419D7800')

  const lightBlueRegion = createRegion(1200, 1599, '#29CCF41A', '#29CCF400')

  const blueRegion = createRegion(1600, 1999, '#266DD31A', '#266DD300')

  const yellowRegion = createRegion(2000, 2399, '#FFED4C1A', '#FFED4C00')

  const orangeRegion = createRegion(2400, 2799, '#FF90001A', '#FF900000')

  const redRegion = createRegion(2800, 9999, '#ED254E1A', '#ED254E00')

  const options: ChartOptions = {
    annotation: {
      drawTime: 'beforeDatasetsDraw',
      annotations: [
        brownRegion,
        grennRegion,
        lightBlueRegion,
        blueRegion,
        yellowRegion,
        orangeRegion,
        redRegion,
      ],
    },
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
          id: 'x0',
          ticks: {
            callback: (_, i) => `#${i + 1}`,
          },
        },
      ],
      yAxes: [
        {
          id: 'y0',
        },
      ],
    },
  } as ChartOptions

  return {
    data,
    options,
  }
}
