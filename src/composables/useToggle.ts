import { ref } from 'vue';

/**
 * A Vue 3 composable that provides a boolean state and a function to toggle its value.
 * @returns A tuple containing the boolean state (as a ref) and the toggle function.
 */
const useToggle = () => {
    const state = ref(false);
    
    const toggle = () => {
        state.value = !state.value;
    };
    
    return [state, toggle] as const;
}