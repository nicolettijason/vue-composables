<script setup lang="ts">
import { useLocaleStorage } from "@/composables/useLocaleStorage";

const data = useLocaleStorage("myKey", { name: "John", age: 30 });
</script>

<template>
  <div v-if="data">
    <h2>Locale Storage Example</h2>
    <p>This example demonstrates the use of the useLocaleStorage composable.</p>
    <div>
      <label for="name">Name:</label>
      <input id="name" v-model="data.name" />
    </div>
    <div>
      <label for="age">Age:</label>
      <input id="age" type="number" v-model.number="data.age" />
    </div>
    <p>Data is automatically saved to local storage under the key "myKey".</p>
    <p>Current Data: {{ data }}</p>
    <button @click="data = undefined">Clear local storage</button>
  </div>
  <div v-else>
    <h2>No Data</h2>
    <p>Local storage is cleared. Click the button below to reset data.</p>
    <button @click="data = { name: 'John', age: 30 }">Reset Data</button>
  </div>

</template>

<style scoped>

</style>