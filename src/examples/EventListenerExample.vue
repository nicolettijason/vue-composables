<script setup lang="ts">
import { useEventListener } from "@/composables/useEventListener";
import { ref } from "vue";

const count = ref(0);
const eventListener = useEventListener("click", () => {
  count.value++;
  console.log(`Document clicked ${count.value} times`);
});

</script>

<template>
  <div>
    <h2>Event Listener Example</h2>
    <p>Click anywhere to increase the count.</p>
    <p>Count: {{ count }}</p>
    <button @click="eventListener.remove()">Remove Event Listener</button>
    <button @click="eventListener.restore()">Restore Event Listener</button>
  </div>
</template>