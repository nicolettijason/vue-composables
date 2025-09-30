<script setup lang="ts">
import { usePrevious } from "@/composables/usePrevious";
import { watch } from "vue";

const [ count, previousCount ] = usePrevious(0);
const [myObj, previousObj] = usePrevious({ a: 1, b: 2 });
</script>

<template>
  <div>
    <h2>Previous Example</h2>
    <h3>Count Example</h3>
    <p>Current Count: {{ count }}</p>
    <p>Previous Count: {{ previousCount }}</p>
    <button @click="count++">Increment Count</button>
    <h3>Object Example</h3>
    <p>Current Object: {{ myObj }}</p>
    <p>Previous Object: {{ previousObj }}</p>
    <button @click="myObj.a++; myObj.b++">Increment Object Values</button>
  </div>
</template>

<style scoped>

</style>