import type { StorageProvider, StackEntry } from "@rezahasani78/sheet-router";
import { store } from "./index";
import { setStack, clearStack } from "./sheet-slice";

const SESSION_KEY = "__sheetRouter_redux";

function readSession(): StackEntry[] {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeSession(stack: readonly StackEntry[]): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(stack));
  } catch {
    // quota exceeded or private browsing
  }
}

export function createReduxStorageProvider(): StorageProvider {
  return {
    save(stack: readonly StackEntry[]): void {
      store.dispatch(setStack([...stack]));
      writeSession(stack);
    },

    load(): StackEntry[] {
      const persisted = readSession();
      if (persisted.length > 0) {
        store.dispatch(setStack(persisted));
      }
      return store.getState().sheet.stack;
    },

    clear(): void {
      store.dispatch(clearStack());
      try {
        sessionStorage.removeItem(SESSION_KEY);
      } catch {
        // ignore
      }
    },
  };
}
