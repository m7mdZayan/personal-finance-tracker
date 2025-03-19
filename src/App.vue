<script>
// import ChartReport from './components/ChartReport.vue'
// import TransactionForm from './components/TransactionForm.vue'
// import TransactionsList from './components/TransactionsList.vue'
// import TransactionSummary from './components/TransactionSummary.vue'

export default {
  components: {
    // TransactionForm,
    // TransactionsList,
    // ChartReport,
    // TransactionSummary,
  },
}
</script>

<template>
  <main class="max-w-[1000px] bg-[#eee] p-5 mx-auto">
    <h1 class="text-2xl font-bold text-center mb-6">Personal Finance Tracker</h1>
    <router-view />
  </main>
</template>

<style scoped></style>
