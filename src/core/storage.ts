const save = <T>(data: T) => chrome.storage.sync.set({ data });

const load = async <T>(): Promise<T> => ((await chrome.storage.sync.get(['data']))?.data || {}) as T;

export { save, load };
