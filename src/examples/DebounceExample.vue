<script setup lang="ts">
import { useDebounce } from "@/composables/useDebounce";
import { ref } from "vue";

const count = ref(0);

const debounceFunc = useDebounce(
  (message: string) => {
    console.log(`Debounced message: ${message}`);
    count.value = 0;
    },
  1000
);

const triggerDebounce = () => {
  count.value++;
  debounceFunc(`Button clicked ${count.value} times`);
};
</script>

<template>
  <div>
    <h2>Debounce Example</h2>
    <p>Click the button to trigger a debounced function call.</p>
    <button @click="triggerDebounce">Trigger Debounce</button>
    <p>Check the console to see the debounced messages.</p>
  </div>
</template>