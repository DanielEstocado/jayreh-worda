import { create } from "zustand";

// The single app-wide store, empty until a slice is added: create<A & B>()((...a) => ({ ...createA(...a), ...createB(...a) })).
const useStore = create(() => ({}));

export default useStore;
