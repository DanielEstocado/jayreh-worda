import useStore from "@/zustand/store/store";

// Returns the function that creates a group.
export function useAddGroup() {
  return useStore((s) => s.addGroup);
}

// Returns the function that adds a mentee to a group.
export function useAddMentee() {
  return useStore((s) => s.addMentee);
}

// Returns the function that ticks or unticks one lesson for one mentee.
export function useToggleMenteeLesson() {
  return useStore((s) => s.toggleMenteeLesson);
}
