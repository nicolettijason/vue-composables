import { computed, isRef, onMounted, Ref, ref } from "vue";

export interface UseAsyncOptions<T = any> {
    // Callback fired when the async function resolves successfully
    onSuccess?: (data: T) => void;
    // Callback fired when the async function throws an error
    onError?: (error: Error) => void;
    // Whether to execute the async function immediately on mount
    immediate?: boolean;
    // Number of times to retry the async function on failure
    // Can be a number or a Ref<number> to allow dynamic updates
    retry?: number | Ref<number>;
    // Whether to reset the data to null when execute is called
    // Can be a boolean or a Ref<boolean> to allow dynamic updates
    resetOnExecute?: boolean | Ref<boolean>;
}

export enum ExecuteState {
    Idle = 'idle',
    Loading = 'loading',
    Success = 'success',
    Error = 'error',
}

const defaultOptions: UseAsyncOptions = {
    immediate: true,
    retry: 0,
    resetOnExecute: false,
}

/**
 * A Vue 3 composable that manages the state of an asynchronous function, including loading,
 * data, error, and retries.
 * @template T The type of the data returned by the async function.
 * @template U The type of the arguments accepted by the async function.
 * @param asyncFunction The asynchronous function to be managed.
 * @param options Configuration options for the composable.
 * @returns An object containing `data`, `error`, `loading`, `execute` function, and `retriesLeft`.
 */
export const useAsync = <T, U extends unknown[] = []>(asyncFunction: (...args: U) => Promise<T>, options: Partial<UseAsyncOptions<T>> = {}) => {
    const data = ref<T | null>(null);
    const error = ref<Error | null>(null);
    const loading = ref(false);
    const retriesCount = ref(0);
    const mergedOptions = { ...defaultOptions, ...options };
    
    const retryOption = computed(() => {
        return isRef(mergedOptions.retry) ? mergedOptions.retry.value : mergedOptions.retry;
    });
    
    const resetOnExecuteOption = computed(() => {
        return isRef(mergedOptions.resetOnExecute) ? mergedOptions.resetOnExecute.value : mergedOptions.resetOnExecute;
    });
    
    const retriesLeft = computed(() => {
        return retryOption.value ? retryOption.value - retriesCount.value : 0;
    })

    const execute = async (...args: U): Promise<T | null> => {
        loading.value = true;
        error.value = null;
        
        if (resetOnExecuteOption.value) {
            data.value = null;
        }
        
        try {
            let response = await asyncFunction(...args);
            data.value = response;
            mergedOptions.onSuccess?.(response);
            retriesCount.value = 0;
            loading.value = false;
            return response;
        } catch (err) {
            error.value = err as Error;
            mergedOptions.onError?.(err as Error);
            if (retryOption.value && retriesCount.value < retryOption.value) {
                retriesCount.value++;
                return execute(...args);
            }
            if (retryOption.value) {
                retriesCount.value = 0; // Reset retries count after exhausting retries
            }
            loading.value = false;
            return Promise.reject(err);
        }
    };
    
    const state = computed(() => {
        if (loading.value) return ExecuteState.Loading;
        if (error.value) return ExecuteState.Error;
        if (data.value !== null) return ExecuteState.Success; 
        return ExecuteState.Idle;
    });

    onMounted(() => mergedOptions.immediate && execute(...([] as unknown as U)));
    
    return { data, error, loading, execute, retriesLeft, retriesCount, state };
}