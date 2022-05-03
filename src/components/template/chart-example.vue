<template lang="pug">
#container
  LineChart(:chartData="testData" :plugins="plugins" :options="options")
</template>

<script>
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  name: 'ChartExample',
  components: {
    LineChart
  },
  setup () {
    const testData = {
      //   labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      //   datasets: [
      //     {
      //       data: [30, 40, 60, 70, 5],
      //       backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED']
      //     }
      //   ],
      //   labels: ['Serie 1', 'Serie 2'],
      datasets: [
        {
          label: 'Serie 1',
          data: [{ x: 'JAN 22', y: 20 }, { x: 'FEB 22', y: 10 }, { x: 'MAR 22', y: 25 }, { x: 'APR 22', y: 30 }],
          backgroundColor: [
            'green'
          ],
          borderColor: 'white',
          color: 'orange'
        },
        {
          label: 'Serie 2',
          data: [{ x: 'JAN 22', y: 25 }, { x: 'FEB 22', y: 7 }, { x: 'MAR 22', y: 22 }, { x: 'APR 22', y: 38 }],
          backgroundColor: [
            'blue'
          ],
          borderColor: 'white',
          color: 'orange'
        }
      ]
    }

    const plugins = [
      {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d')
          ctx.save()
          ctx.globalCompositeOperation = 'destination-over'
          ctx.fillStyle = 'black'
          ctx.lineWidth = 5
          ctx.fillRect(0, 0, chart.width, chart.height)
          ctx.restore()
        }
      }
    ]

    const options = {
      animations: {
        borderWidth: {
          duration: 2000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true
        }
      },
      scales: {
        y: { // defining min and max so hiding the dataset does not change scale range
          min: 0
        }
      },
      elements: {
        line: {
        //   borderWidth: 15
        }
      }
    }

    return { testData, plugins, options }
  }
}
</script>
