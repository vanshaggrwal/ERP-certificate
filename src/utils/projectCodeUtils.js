/**
 * Convert project code (with slashes) to document ID format (with hyphens)
 * Example: "ICEM/ENGG/3rd/TP/26-27" -> "ICEM-ENGG-3rd-TP-26-27"
 */
export function codeToDocId(projectCode) {
  return String(projectCode).replace(/\//g, "-");
}

/**
 * Convert document ID format (with hyphens) back to project code (with slashes)
 * Example: "ICEM-ENGG-3rd-TP-26-27" -> "ICEM/ENGG/3rd/TP/26-27"
 *
 * NOTE: This is a naive conversion that replaces hyphens with slashes.
 * It assumes the original project code only contained hyphens in date ranges like "26-27"
 * If a project code naturally contains hyphens in other positions, this conversion won't be perfect.
 * Consider storing the original project code in the student documents for accurate retrieval.
 */
export function docIdToCode(docId) {
  return String(docId).replace(/-/g, "/");
}
