import { create } from "zustand";
import { createInboxSlice, type InboxSlice } from "../slices/inboxSlice";
import {
  createMentoringSlice,
  type MentoringSlice,
} from "../slices/mentoringSlice";
import { createPostSlice, type PostSlice } from "../slices/postSlice";

export type AppState = PostSlice & MentoringSlice & InboxSlice;

// The single app-wide store, add each new slice to AppState and to the object below.
const useStore = create<AppState>()((...a) => ({
  ...createPostSlice(...a),
  ...createMentoringSlice(...a),
  ...createInboxSlice(...a),
}));

export default useStore;
