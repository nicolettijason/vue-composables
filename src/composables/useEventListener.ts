import { onBeforeUnmount, onMounted, Ref, unref, watch } from "vue";

/**
 * A Vue 3 composable that adds an event listener to a specified target when the component is mounted
 * and removes it when the component is about to unmount.
 * @param event The event type to listen for (e.g., 'click', 'resize').
 * @param handler The function to be called when the event is triggered.
 * @param target The target to which the event listener will be attached (e.g., window, document, or a specific DOM element).
 * @param options You can pass either a boolean or an object for options (e.g., { capture: true }).
 * @returns An object with `restore` and `remove` methods to manually add or remove the event listener.
 */
export function useEventListener<K extends keyof WindowEventMap>(
    event: K,
    handler: (ev: WindowEventMap[K]) => void,
    target: EventTarget | Ref<EventTarget | null> = window,
    options: boolean | AddEventListenerOptions = false,
) {
    const resolvedTarget = () => unref(target) || window;
    
    const restore = (el: EventTarget | undefined = undefined) => {
        const t = el ?? resolvedTarget();
        t.addEventListener(event, handler as EventListener, options);
    }

    const remove = (el: EventTarget | undefined = undefined) => {
        const t = el ?? resolvedTarget();
        t.removeEventListener(event, handler as EventListener, options);
    }
    
    watch(resolvedTarget, (newTarget, _, onCleanup) => {
        if (!newTarget) return;
        restore(newTarget);
        onCleanup(() => {
            remove(newTarget);
            console.log(`Removed event listener for ${event} from`, newTarget);
        });
    }, { immediate: true });
    
    return {
        restore,
        remove,
    };
}