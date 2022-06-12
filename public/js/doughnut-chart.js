function getCategoriesAmounts(expenses) {
  const categories = new Set(
    [...expenses].map((expense) => expense.dataset.category)
  )
}

const canvas = document.getElementById('myChart')
const expenses = document.querySelectorAll('h3.expenseAmount')
const totalAmount = document.querySelector('h1.totalAmount').innerText

const categories = [
  ...new Set([...expenses].map((expense) => expense.dataset.category)),
]

const amounts = categories.map((category) => {
  const categoryAmounts = [...expenses].filter(
    (expense) => expense.dataset.category === category
  )
  let categoryAmount = 0
  categoryAmounts.forEach((expense) => {
    categoryAmount += Number(expense.innerText)
  })
  return categoryAmount
})

const data = {
  labels: categories,
  datasets: [
    {
      label: 'Categories Amounts',
      data: amounts,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(3, 252, 7)',
        'rgb(161, 3, 252)',
      ],
      hoverOffset: 4,
    },
  ],
}

const stackedText = {
  id: 'stackedText',
  afterDatasetsDraw(chart, args, options) {
    const {
      ctx,
      chartArea: { left, top, right, bottom, width, height },
    } = chart
    ctx.save()
    const fontSize = height / 8
    const halfFontSize = fontSize / 2
    ctx.font = `bolder ${fontSize}px Arial`
    ctx.fillStyle = 'rgba(255, 255, 255,)'
    ctx.textAlign = 'center'
    ctx.fillText(`${totalAmount}`, width / 2, height / 2 + top - 10)
    ctx.restore()

    ctx.font = `bolder ${halfFontSize}px Arial`
    ctx.fillStyle = 'rgba(255, 255, 255,)'
    ctx.textAlign = 'center'
    ctx.fillText('總消費金額', width / 2, height / 2 + top + fontSize)
    ctx.restore()
  },
}

const legendMargin = {
  id: 'legendMargin',
  beforeInit(chart, legend, options) {
    const fitValue = chart.legend.fit

    chart.legend.fit = function fit() {
      fitValue.bind(chart.legend)()
      return (this.height += 20)
    }
  },
}

const config = {
  type: 'doughnut',
  data: data,
  options: {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 15,
            weight: 900,
          },
        },
      },
      datalabels: {
        formatter: (value, context) => {
          const dataPoints = context.chart.data.datasets[0].data
          function totalSum(total, dataPoints) {
            return total + dataPoints
          }
          const totalValue = dataPoints.reduce(totalSum, 0)
          const percentageValue = ((value / totalValue) * 100).toFixed(1)
          return percentageValue + '%'
        },
        color: 'black',
        font: {
          weight: 'bold',
        },
        align: 'end',
        anchor: 'end',
      },
    },
  },
  plugins: [ChartDataLabels, stackedText, legendMargin],
}

const myChart = new Chart(canvas, config)
