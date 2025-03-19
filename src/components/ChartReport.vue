<template>
  <el-card class="p-6">
    <div class="flex justify-between items-center mb-4">
      <router-link to="/">
        <el-button type="info">Back to home</el-button>
      </router-link>
      <el-button type="primary" @click="exportToCSV">Export CSV</el-button>
    </div>
    <Bar id="incomeAndExpensesChart" :options="chartOptions" :data="chartData" />
  </el-card>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { useTransactionStore } from '@/stores/useTransactionStore'
import { categoriesList } from '../utils/data'
import { downloadCSV } from '../utils/functions'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'ChartReport',
  components: { Bar },
  data() {
    return {
      store: useTransactionStore(),
      categories: categoriesList,
      chartData: {
        labels: [],
        datasets: [],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Income & Expenses by Category' },
        },
      },
    }
  },
  methods: {
    generateChartData() {
      const incomeData = this.categories.map((category) =>
        this.store.transactions
          .filter((t) => t.type === 'income' && t.category === category)
          .reduce((sum, t) => sum + parseFloat(t.convertedAmount), 0),
      )
      const expenseData = this.categories.map((category) =>
        this.store.transactions
          .filter((t) => t.type === 'expense' && t.category === category)
          .reduce((sum, t) => sum + parseFloat(t.convertedAmount), 0),
      )

      this.chartData = {
        labels: this.categories,
        datasets: [
          {
            label: 'Income',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: incomeData,
          },
          {
            label: 'Expenses',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: expenseData,
          },
        ],
      }
    },
    exportToCSV() {
      const csvContent = [
        ['Category', 'Income (EGP)', 'Expenses (EGP)'],
        ...this.categories.map((category, index) => [
          category,
          this.chartData.datasets[0].data[index], // Income
          this.chartData.datasets[1].data[index], // Expenses
        ]),
      ]
        .map((row) => row.join(','))
        .join('\n')

      downloadCSV(csvContent, 'Transaction report.csv')
    },
  },
  watch: {
    'store.transactions': {
      handler() {
        this.generateChartData()
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>
