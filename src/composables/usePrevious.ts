import { isRef, ref, Ref, watch } from "vue";

/**
 * A Vue 3 composable that tracks the previous value of a reactive variable or ref.
 * @param value The reactive variable or ref to track.
 * @returns A tuple containing the current value (as a ref) and the previous value (as a ref).
 */
export const usePrevious = <T>(value: T | Ref<T>) => {
    const previous = ref<T | undefined>(undefined);
    const current = isRef(value) ? value : ref(value) as Ref<T>;
    
    // We use a snapshot to avoid issues with references for objects and arrays
    const snapshot = ref<T>(JSON.parse(JSON.stringify(current.value))) as Ref<T>
    
    watch(current, (newValue) => {
        console.log('Value changed from', snapshot.value);
        previous.value = JSON.parse(JSON.stringify(snapshot.value));
        snapshot.value = JSON.parse(JSON.stringify(newValue));
    }, { deep: true });
    
    return [ current, previous ] as const;
}