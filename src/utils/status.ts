import type { Status } from "@/types/status"

/**
 * Normalizes a status value to the canonical key ("completed", "in_progress",
 * "planned") regardless of the casing/spacing stored in the database
 * (e.g. "Completed" or "In Progress").
 */
export function normalizeStatus(status: string | undefined): string {
  return String(status ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_")
}

export function statusLabel(status: Status | string | undefined) {
  switch (normalizeStatus(status)) {
    case "completed":
      return "Completed"
    case "in_progress":
      return "In Progress"
    case "planned":
      return "Planned"
    default:
      return ""
  }
}

export function statusColor(status: Status | string | undefined) {
  switch (normalizeStatus(status)) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "in_progress":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "planned":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    default:
      return ""
  }
}
