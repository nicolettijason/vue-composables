<script setup lang="ts">
import { useAsync } from "@/composables/useAsync";
import { ref } from "vue";

const simulateError = ref(false);
const retry = ref(0);

const {
  data,
  error,
  loading,
  execute,
  retriesLeft,
} = useAsync(async () => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      console.log("Async operation completed");
      if (simulateError.value) {
        reject(new Error("Simulated error occurred"));
      } else {
        resolve("Data loaded successfully!");
      }
    }, 2000);
  });
  // Simulate an asynchronous operation
}, { immediate: false, retry });
</script>

<template>
  <div>
    <h2>Async Example</h2>
    <p>This example demonstrates the use of the useAsync composable.</p>
    <button @click="execute" :disabled="loading">
      {{ loading ? "Loading..." : "Load Data" }}
    </button>
    <div v-if="loading">Loading data, please wait...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="data">Data: {{ data }}</div>
      <div>
        <label>
          <input type="checkbox" v-model="simulateError" />
          Simulate Error
        </label>
        <label>
          <input type="number" v-model.number="retry" min="0" />
          Retry Attempts
        </label>
        <p>Retries Left: {{ retriesLeft }}</p>
      </div>
  </div>

</template>

<style scoped>

</style>