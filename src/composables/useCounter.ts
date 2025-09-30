import { ref } from "vue";

/**
 * A Vue 3 composable that provides a simple counter with increment, decrement, and reset functionalities.
 * @returns An object containing the current count (as a ref) and functions to modify it.
 */
export const useCounter = () => {
    let count = ref(0);
    
    const increment = () => count.value++;
    
    const decrement = () => count.value--;
    
    const reset = () => count.value = 0;
    
    return { count, increment, decrement, reset };
}