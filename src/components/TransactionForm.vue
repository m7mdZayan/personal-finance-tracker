<script>
import { useTransactionStore } from '@/stores/useTransactionStore'
import { mapActions } from 'pinia'
import CurrencyConverter from './CurrencyConverter.vue'
import { categoriesList } from '../utils/data'
import { baseCurrency } from '../utils/data'

export default {
  components: { CurrencyConverter },
  data() {
    return {
      baseCurrency: baseCurrency,
      resetCurrencyFields: false,
      categories: categoriesList,
      transaction: {
        amount: '',
        convertedAmount: '',
        category: '',
        type: 'expense',
        date: '',
        currency: baseCurrency,
      },
    }
  },
  methods: {
    ...mapActions(useTransactionStore, ['addTransaction']),

    submitForm() {
      if (
        !this.transaction.convertedAmount ||
        !this.transaction.category ||
        !this.transaction.date
      ) {
        alert('Please fill in all fields.')
        return
      }
      this.addTransaction({ ...this.transaction })
      this.resetForm()
      this.resetCurrencyFields = true
    },

    resetForm() {
      this.transaction = {
        amount: '',
        convertedAmount: '',
        category: '',
        type: 'expense',
        date: '',
        currency: this.baseCurrency, // Reset to base currency
      }
    },

    updateConvertedAmount(amount) {
      this.transaction.convertedAmount = amount
    },
  },
}
</script>

<template>
  <el-card class="p-6">
    <h2 class="text-xl font-semibold mb-4">Add Transaction</h2>
    <el-form @submit.prevent="submitForm">
      <CurrencyConverter
        :baseCurrency="baseCurrency"
        :resetFields="resetCurrencyFields"
        v-model:amount="transaction.amount"
        v-model:fromCurrency="transaction.currency"
        @update:convertedAmount="updateConvertedAmount"
        @resetfields="resetCurrencyFields = $event"
      />

      <el-form-item :label="`Converted Amount (${baseCurrency})`">
        <el-input v-model="transaction.convertedAmount" type="number" readonly />
      </el-form-item>

      <el-form-item label="Category">
        <el-select v-model="transaction.category">
          <el-option
            v-for="category in categories"
            :key="category"
            :label="category"
            :value="category"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Type">
        <el-radio-group v-model="transaction.type">
          <el-radio label="income">Income</el-radio>
          <el-radio label="expense">Expense</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Date">
        <el-date-picker v-model="transaction.date" type="date" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">Add Transaction</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
