import { CLUSTERS, DEPARTMENTS, SECTIONS } from "@/constants/worda";
import type { Membership } from "@/types/church";

// Turns a department, section and cluster path into readable text, e.g. "Relationship · Sports · Cluster 5".
export function getMembershipLabel(membership: Membership): string {
  const parts = [DEPARTMENTS.find((d) => d.id === membership.departmentId)?.label];

  if (membership.sectionId) {
    parts.push(SECTIONS.find((s) => s.id === membership.sectionId)?.label);
  }
  if (membership.clusterId) {
    const cluster = CLUSTERS.find((c) => c.id === membership.clusterId);
    if (cluster) parts.push(`Cluster ${cluster.label}`);
  }

  return parts.filter(Boolean).join(" · ");
}
