import type { ChurchLists, Membership } from "@/types/church";

// Turns a department, section and cluster path into readable text, e.g. "Relationship · Sports · Cluster 5".
export function getMembershipLabel(
  membership: Membership,
  { departments, sections, clusters }: ChurchLists,
): string {
  const parts = [
    departments.find((d) => d.id === membership.departmentId)?.label,
  ];

  if (membership.sectionId) {
    parts.push(sections.find((s) => s.id === membership.sectionId)?.label);
  }
  if (membership.clusterId) {
    const cluster = clusters.find((c) => c.id === membership.clusterId);
    if (cluster) parts.push(`Cluster ${cluster.label}`);
  }

  return parts.filter(Boolean).join(" · ");
}
