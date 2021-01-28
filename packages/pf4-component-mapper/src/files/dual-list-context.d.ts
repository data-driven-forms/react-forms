export interface SortConfig {
    left: 'asc' | 'desc';
    right: 'asc' | 'desc';
}

export type SetSortConfig = (newSortConfig: SortConfig) => void;

export interface DualListContextValue {
    sortConfig: SortConfig;
    setSortConfig: SetSortConfig;
}

export interface DualListContext {
  value: DualListContextValue;
}

export default DualListContext;
