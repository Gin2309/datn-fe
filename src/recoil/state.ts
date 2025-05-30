import type { AtomEffect } from "recoil";
import { atom } from "recoil";

const store = typeof window !== "undefined" ? window.localStorage : null;

export const localStorageEffect: (key: string) => AtomEffect<any> =
  (key) =>
  ({ setSelf, onSet }) => {
    try {
      if (store) {
        const savedValue = store.getItem(key);
        if (savedValue != null) {
          setSelf(JSON.parse(savedValue));
        }

        onSet((newValue, _, isReset) => {
          isReset ? store.removeItem(key) : store.setItem(key, JSON.stringify(newValue));
        });
      }
    } catch (e) {
      if (store) {
        store.removeItem(key);
      }
    }
  };

export const profileState = atom<any>({
  key: "PROFILE_STATE",
  default: {
    data: null,
    refetch: null,
  },
});
