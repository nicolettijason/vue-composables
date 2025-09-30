import { onMounted, ref, watch } from "vue";

const baseStorage = <T>(key: string, initialValue?: T, storage: Storage) => {
    const data = ref<T | undefined>();
    watch(data, (newValue) => {
        if (newValue === undefined || newValue === null) {
            storage.removeItem(key);
            return;
        }
        storage.setItem(key, JSON.stringify(newValue));
    }, { deep: true });
    
    onMounted(() => {
        const storedValue = storage.getItem(key);
        if (storedValue === null && initialValue !== undefined) {
            data.value = initialValue;
            return;
        }
        if (storedValue) {
            try {
                data.value = JSON.parse(storedValue) as T;
            } catch (e) {
                const storageType = storage === localStorage ? 'LocalStorage' : 'SessionStorage';
                console.error(`use${storageType}: Failed to parse stored value for key "${key}".`, e);
            }
        }
    });
    return data;
}
     

/**
 * A Vue 3 composable that syncs a reactive variable with localStorage.
 * @template T The type of the reactive variable.
 * @param key The key under which the value will be stored in localStorage.
 * @param initialValue An optional initial value to set if localStorage is empty.
 * @returns A ref that is synced with localStorage.
 */
export const useLocaleStorage = <T>(key: string, initialValue?: T) => baseStorage(key, initialValue, localStorage);


/**
 * A Vue 3 composable that syncs a reactive variable with sessionStorage.
 * @template T The type of the reactive variable.
 * @param key The key under which the value will be stored in sessionStorage.
 * @param initialValue An optional initial value to set if sessionStorage is empty.
 * @returns A ref that is synced with sessionStorage.
 */
export const useSessionStorage = <T>(key: string, initialValue?: T) => baseStorage(key, initialValue, sessionStorage);