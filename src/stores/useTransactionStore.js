import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTransactionStore = defineStore('transactionStore', () => {
  const transactions = ref([])

  // Add a new transaction
  function addTransaction(transaction) {
    transactions.value.push(transaction)
  }

  // Delete a transaction by index
  function deleteTransaction(index) {
    transactions.value.splice(index, 1)
  }

  // Edit an existing transaction
  function editTransaction(index, updatedTransaction) {
    transactions.value[index] = updatedTransaction
  }

  // Computed: Get total income and expenses
  const totalIncome = computed(() =>
    transactions.value.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
  )

  const totalExpenses = computed(() =>
    transactions.value.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
  )

  const netBalance = computed(() => totalIncome.value - totalExpenses.value)

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    editTransaction,
    totalIncome,
    totalExpenses,
    netBalance,
  }
})
