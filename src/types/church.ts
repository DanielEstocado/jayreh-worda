export type Department = { id: number; label: string };

export type Section = { id: number; departmentId: number; label: string };

export type Cluster = { id: number; sectionId: number; label: string };

export type Tag = { id: number; label: string };

// One place a person serves: a department, optionally narrowed to a section and a cluster inside it.
export type Membership = {
  departmentId: number;
  sectionId?: number;
  clusterId?: number;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  // ISO date, YYYY-MM-DD.
  birthday: string;
  contactNumber: string;
  avatarUrl?: string;
  address: string;
  city: string;
  province: string;
  country: string;
  languages: string[];
  tagIds: number[];
  memberships: Membership[];
  exp: number;
};
