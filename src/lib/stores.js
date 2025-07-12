// IMPORTS
import { writable } from "svelte/store";

export const tableStoreData = writable([]);

export const totalRowsStored = writable(1);

export const dataImported = writable(false);

export const savedTableValues = writable([]);

export const savedStyleSettings = writable({});

export const savedMatchValuesData = writable({});
