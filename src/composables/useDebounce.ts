import { ref } from "vue";
import { useTimeout } from "@/composables/useTimeout";

/**
 * A Vue 3 composable that returns a debounced version of a function.
 * @typeparam T The return type of the function.
 * @typeparam A The argument types of the function (default is an empty array).
 * @param fn  The function to be debounced.
 * @param delay The debounce delay in milliseconds (default is 300ms).
 * @returns A debounced version of the input function.
 */
export const useDebounce = <T, A extends any[] = []>(fn: (...args: A) => T, delay = 300) => {
    const { start, clear } = useTimeout(fn, delay); // Ensure the useTimeout composable is included
    
    if (delay <= 0) {
        console.warn("useDebounce: delay should be greater than 0. 300ms will be used instead.");
        delay = 300;
    }

    return (...args: A) => {
        clear(); // Clear any existing timeout to reset the debounce period
        start(...args); // Start a new timeout with the provided arguments
    };
};