<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
enum Example {
  None,
  EventListener,
  Debounce,
  Previous,
  LocaleStorage,
  UseAsync,
}
const exampleRef = ref(Example.None);

const options = [
  {
    label: "Event Listener",
    value: Example.EventListener,
  },
  {
    label: "Debounce",
    value: Example.Debounce,
  },
  {
    label: "Previous",
    value: Example.Previous,
  },
  {
    label: "Locale Storage",
    value: Example.LocaleStorage,
  },
  {
    label: "Use Async",
    value: Example.UseAsync,
  }
]

const getComponent = (example: Example) => {
  switch (example) {
    case Example.EventListener:
      return defineAsyncComponent(() => import("./examples/EventListenerExample.vue"));
    case Example.Debounce:
      return defineAsyncComponent(() => import("./examples/DebounceExample.vue"));
    case Example.Previous:
      return defineAsyncComponent(() => import("./examples/PreviousExample.vue"));
    case Example.LocaleStorage:
      return defineAsyncComponent(() => import("./examples/LocaleStorageExample.vue"));
    case Example.UseAsync:
      return defineAsyncComponent(() => import("./examples/UseAsyncExample.vue"));
    default:
      return null;
  }
};
</script>

<template>
  <div>
    <h1>Welcome to the Vue 3 Composables Examples</h1>
    <p>Select an example from the sidebar to see it in action.</p>
    <div style="display: flex; gap: 20px;">
      <div v-if="exampleRef === Example.None" style="flex: 1;">
        <h2>Examples</h2>
        <ul>
          <li v-for="option in options" :key="option.value" style="margin-bottom: 10px;">
            <button @click="exampleRef = option.value">{{ option.label }}</button>
          </li>
        </ul>
      </div>
      <div v-else style="flex: 3; border-left: 1px solid #ccc; padding-left: 20px;">
        <h2>Example Output</h2>
        <button @click="exampleRef = Example.None" style="margin-top: 20px;">
          Back to Examples
        </button>
        <div style="flex: 5; padding-left: 20px;">
          <component :is="getComponent(exampleRef)"/>
        </div>
      </div>
    </div>
  </div>
</template>