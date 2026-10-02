import type { Cluster, Department, Section, Tag } from "@/types/church";

export const DEPARTMENTS: Department[] = [
  { id: 1, label: "Worship" },
  { id: 2, label: "Outreach" },
  { id: 3, label: "Relationship" },
  { id: 4, label: "Discipleship" },
  { id: 5, label: "Administrator" },
];

// Every id is unique across all departments, a section points up to its department.
export const SECTIONS: Section[] = [
  { id: 1, departmentId: 3, label: "Men's" },
  { id: 2, departmentId: 3, label: "Ladies" },
  { id: 3, departmentId: 3, label: "Young Adults" },
  { id: 4, departmentId: 3, label: "Youth Empowered" },
  { id: 5, departmentId: 3, label: "Sports" },
  { id: 6, departmentId: 3, label: "Ushering" },
  { id: 7, departmentId: 3, label: "Guest Experience" },
];

// Every id is unique across all sections, a cluster points up to its section.
export const CLUSTERS: Cluster[] = [
  { id: 1, sectionId: 5, label: "1" },
  { id: 2, sectionId: 5, label: "2A" },
  { id: 3, sectionId: 5, label: "2B" },
  { id: 4, sectionId: 5, label: "3" },
  { id: 5, sectionId: 5, label: "4" },
  { id: 6, sectionId: 5, label: "5" },
];

export const TAGS: Tag[] = [
  { id: 1, label: "Developer" },
  { id: 2, label: "Mentor" },
  { id: 3, label: "Pastor" },
  { id: 4, label: "Senior Pastor" },
  { id: 5, label: "Worker" },
];
