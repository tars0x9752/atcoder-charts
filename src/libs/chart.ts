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

  const options: ChartOptions = {
    annotation: {
      drawTime: 'beforeDatasetsDraw',
      annotations: [
        {
          type: 'box',
          xScaleID: 'x0',
          yScaleID: 'y0',
          xMin: labels[0],
          xMax: labels[labels.length - 1],
          yMin: 400,
          yMax: 799,
          backgroundColor: '#AF81691A',
          borderColor: '#AF816900',
          borderWidth: 0,
        },
        {
          type: 'box',
          xScaleID: 'x0',
          yScaleID: 'y0',
          xMin: labels[0],
          xMax: labels[labels.length - 1],
          yMin: 800,
          yMax: 1199,
          backgroundColor: '#419D781A',
          borderColor: '#419D7800',
          borderWidth: 0,
        },
        {
          type: 'box',
          xScaleID: 'x0',
          yScaleID: 'y0',
          xMin: labels[0],
          xMax: labels[labels.length - 1],
          yMin: 1200,
          yMax: 1599,
          backgroundColor: '#29CCF41A',
          borderColor: '#29CCF400',
          borderWidth: 0,
        },
        {
          type: 'box',
          xScaleID: 'x0',
          yScaleID: 'y0',
          xMin: labels[0],
          xMax: labels[labels.length - 1],
          yMin: 1600,
          yMax: 1999,
          backgroundColor: '#266DD31A',
          borderColor: '#266DD300',
          borderWidth: 0,
        },
        {
          type: 'box',
          xScaleID: 'x0',
          yScaleID: 'y0',
          xMin: labels[0],
          xMax: labels[labels.length - 1],
          yMin: 2000,
          yMax: 2399,
          backgroundColor: '#FFED4C1A',
          borderColor: '#FFED4C00',
          borderWidth: 0,
        },
        {
          type: 'box',
          xScaleID: 'x0',
          yScaleID: 'y0',
          xMin: labels[0],
          xMax: labels[labels.length - 1],
          yMin: 2400,
          yMax: 2799,
          backgroundColor: '#FF90001A',
          borderColor: '#FF900000',
          borderWidth: 0,
        },
        {
          type: 'box',
          xScaleID: 'x0',
          yScaleID: 'y0',
          xMin: labels[0],
          xMax: labels[labels.length - 1],
          yMin: 2800,
          yMax: 3199,
          backgroundColor: '#ED254E1A',
          borderColor: '#ED254E00',
          borderWidth: 0,
        },
        {
          type: 'box',
          xScaleID: 'x0',
          yScaleID: 'y0',
          xMin: labels[0],
          xMax: labels[labels.length - 1],
          yMin: 3200,
          yMax: 3599,
          backgroundColor: '#EDF9FF4D',
          borderColor: '#EDF9FF00',
          borderWidth: 0,
        },
        {
          type: 'box',
          xScaleID: 'x0',
          yScaleID: 'y0',
          xMin: labels[0],
          xMax: labels[labels.length - 1],
          yMin: 3600,
          yMax: 9999,
          backgroundColor: '#FEFFF24D',
          borderColor: '#FEFFF200',
          borderWidth: 0,
        },
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
