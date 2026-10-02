import type { StateCreator } from "zustand";
import { MOCK_GROUPS, MOCK_MENTEE_COMPLETIONS, MOCK_MENTEES } from "@/constants/mentoring";
import type { Group, Mentee, MenteeCompletion } from "@/types/mentoring";
import type { AppState } from "../store/store";

export type MentoringSlice = {
  groups: Group[];
  mentees: Mentee[];
  menteeCompletions: MenteeCompletion[];
  addGroup: (input: Omit<Group, "id">) => Group;
  addMentee: (input: Omit<Mentee, "id">) => void;
  toggleMenteeLesson: (menteeId: number, lessonId: number) => void;
};

// Next free id for a list that already has numeric ids.
const nextId = (items: { id: number }[]) => Math.max(0, ...items.map((i) => i.id)) + 1;

// Groups, their mentees and the lessons a mentor marked done, global so every group screen and the profile counts always agree.
export const createMentoringSlice: StateCreator<AppState, [], [], MentoringSlice> = (set, get) => ({
  groups: MOCK_GROUPS,
  mentees: MOCK_MENTEES,
  menteeCompletions: MOCK_MENTEE_COMPLETIONS,

  // Adds a new group and returns it so the screen can open it.
  addGroup: (input) => {
    const group: Group = { ...input, id: nextId(get().groups) };
    set((state) => ({ groups: [...state.groups, group] }));
    return group;
  },

  // Adds a mentee to a group, the screen only offers this to the group's mentor.
  addMentee: (input) =>
    set((state) => ({ mentees: [...state.mentees, { ...input, id: nextId(state.mentees) }] })),

  // Marks a lesson done for a mentee, or takes it back if it was already done. The screen only offers this to the group's mentor.
  toggleMenteeLesson: (menteeId, lessonId) =>
    set((state) => {
      const exists = state.menteeCompletions.some(
        (c) => c.menteeId === menteeId && c.lessonId === lessonId,
      );

      return {
        menteeCompletions: exists
          ? state.menteeCompletions.filter(
              (c) => !(c.menteeId === menteeId && c.lessonId === lessonId),
            )
          : [
              ...state.menteeCompletions,
              { menteeId, lessonId, completedAt: new Date().toISOString().slice(0, 10) },
            ],
      };
    }),
});
