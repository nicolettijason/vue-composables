import { onBeforeUnmount, onMounted, ref } from "vue";

export interface UseTimeoutOptions {
    immediate?: boolean; // Whether to start the timeout immediately upon creation
}

/**
 * A Vue 3 composable that provides a timeout functionality.
 * @typeparam T The return type of the function.
 * @typeparam A The argument types of the function (default is an empty array).
 * @param fn The function to be executed after the delay.
 * @param delay The delay in milliseconds before executing the function.
 * @param options Configuration options for the timeout.
 * @returns An object containing `start` and `clear` functions to control the timeout.
 */
export const useTimeout = <T, A extends any[] = []>(fn: (...args: A) => T, delay: number, options: UseTimeoutOptions = { immediate: false }) => {
    const timeout = ref<NodeJS.Timeout | null>(null);

    if (delay <= 0) {
        console.warn("useTimeout: delay should be greater than 0. Timeout will not be set.");
    }

    const start = (...args: A) => {
        if (delay <= 0) return;
        timeout.value = setTimeout(() => {
            fn(...args);
        }, delay);
    };

    const clear = () => {
        if (timeout.value) {
            clearTimeout(timeout.value);
            timeout.value = null;
        }
    };
    
    onMounted(() => options.immediate && start(...([] as unknown as A)));
    
    onBeforeUnmount(clear);

    return { start, clear };
}