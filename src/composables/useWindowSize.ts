import { ref } from "vue";
import { useEventListener } from "@/composables/useEventListener";

/**
 * A Vue 3 composable that tracks the current window size (width and height).
 * It updates the values whenever the window is resized.
 * @returns An object containing the current width and height of the window (as refs).
 */
export const useWindowSize = () => {
    const width = ref(window.innerWidth);
    const height = ref(window.innerHeight);
    
    useEventListener("resize", () => {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
    });
    
    return { width, height };
};