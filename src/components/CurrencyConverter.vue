<script>
import axios from 'axios'
import { baseCurrency, availableCurrencies } from '../utils/data'

export default {
  props: {
    baseCurrency: {
      type: String,
      default: baseCurrency,
    },
    resetFields: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      amount: '',
      fromCurrency: baseCurrency,
      exchangeRates: {},
      availableCurrencies: availableCurrencies,
      apiUrl: import.meta.env.VITE_EXCHANGE_API_URL, // Load API URL from env file
    }
  },
  async mounted() {
    await this.fetchExchangeRates()
  },
  methods: {
    async fetchExchangeRates() {
      try {
        const response = await axios.get(`${this.apiUrl}${this.baseCurrency}`)
        this.exchangeRates = response.data.rates
      } catch (error) {
        console.error('Error fetching exchange rates:', error)
      }
    },
    convertCurrency() {
      if (!this.amount || !this.fromCurrency) return
      const rate = this.exchangeRates[this.fromCurrency]
      if (rate) {
        const convertedAmount = (this.amount / rate).toFixed(2)
        this.$emit('update:convertedAmount', convertedAmount) // Emit the value to parent
      }
    },
  },
  watch: {
    resetFields(newValue) {
      if (newValue) {
        this.amount = ''
        this.fromCurrency = this.baseCurrency
        this.$emit('resetfields', false)
      }
    },
  },
}
</script>

<template>
  <el-card class="mb-6">
    <h4 class="mb-4">Enter the amount and choose its currency</h4>
    <el-form @submit.prevent="convertCurrency">
      <el-form-item label="Amount">
        <el-input v-model="amount" type="number" @input="convertCurrency" />
      </el-form-item>

      <el-form-item label="From Currency">
        <el-select v-model="fromCurrency" @change="convertCurrency">
          <el-option
            v-for="currency in availableCurrencies"
            :key="currency"
            :label="currency"
            :value="currency"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
