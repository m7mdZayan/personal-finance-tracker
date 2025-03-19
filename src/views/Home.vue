<template>
  <div class="p-6">
    <TransactionSummary class="mb-4" />
    <TransactionForm class="mb-4" />
    <TransactionsList />
  </div>
</template>

<script>
import TransactionForm from '../components/TransactionForm.vue'
import TransactionsList from '../components/TransactionsList.vue'
import TransactionSummary from '../components/TransactionSummary.vue'

export default {
  components: {
    TransactionForm,
    TransactionsList,
    TransactionSummary,
  },
}
</script>
