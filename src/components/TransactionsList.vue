<script>
import { useTransactionStore } from '@/stores/useTransactionStore'
import { mapState, mapActions } from 'pinia'

export default {
  computed: {
    ...mapState(useTransactionStore, ['transactions']),
  },
  methods: {
    ...mapActions(useTransactionStore, ['deleteTransaction']),
  },
}
</script>

<template>
  <el-card class="p-6">
    <h2 class="text-xl font-semibold mb-4">Transactions</h2>

    <el-table v-if="transactions.length" :data="transactions" border>
      <el-table-column prop="date" label="Date" />
      <el-table-column prop="category" label="Category" />
      <el-table-column prop="amount" label="Amount">
        <template #default="{ row }">
          <span :class="row.type === 'income' ? 'text-green-500' : 'text-red-500'">
            {{ row.convertedAmount }} {{ row.currency }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="Type">
        <template #default="{ row }">
          <el-tag :type="row.type === 'income' ? 'success' : 'danger'">
            {{ row.type }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center">
        <template #default="{ row, $index }">
          <el-button size="small" type="danger" @click="deleteTransaction($index)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <p v-else class="text-gray-500 text-center">No transactions yet!</p>
  </el-card>
</template>
