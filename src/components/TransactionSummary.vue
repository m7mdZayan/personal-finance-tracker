<script>
import { useTransactionStore } from '@/stores/useTransactionStore'
import { mapState } from 'pinia'
import { baseCurrency } from '../utils/data'

export default {
  data() {
    return {
      store: useTransactionStore(), // Store instance
      baseCurrency: baseCurrency,
    }
  },
  computed: {
    ...mapState(useTransactionStore, ['transactions']),
  },
  methods: {
    totalIncome() {
      const income = this.transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.convertedAmount), 0)

      return this.formatCurrency(income)
    },

    totalExpenses() {
      const expenses = this.transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.convertedAmount), 0)

      return this.formatCurrency(expenses)
    },

    netBalance() {
      const balance = this.transactions.reduce(
        (sum, t) =>
          t.type === 'income'
            ? sum + parseFloat(t.convertedAmount)
            : sum - parseFloat(t.convertedAmount),
        0,
      )

      return this.formatCurrency(balance)
    },

    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value)
    },
  },
}
</script>

<template>
  <el-card class="p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold">Transaction Summary</h2>
      <router-link to="/report">
        <el-button type="info">Go to Report</el-button>
      </router-link>
    </div>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="text-center">
          <p class="text-gray-600">Total Income</p>
          <p class="text-green-600 text-lg font-bold">{{ totalIncome() }} {{ baseCurrency }}</p>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="text-center">
          <p class="text-gray-600">Total Expenses</p>
          <p class="text-red-600 text-lg font-bold">{{ totalExpenses() }} {{ baseCurrency }}</p>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="text-center">
          <p class="text-gray-600">Net Balance</p>
          <p
            :class="{ 'text-green-600': netBalance() >= 0, 'text-red-600': netBalance() < 0 }"
            class="text-lg font-bold"
          >
            {{ netBalance() }} {{ baseCurrency }}
          </p>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>
