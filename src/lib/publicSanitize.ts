export function stripPrivateFields<T extends { reviewerEmail?: string; adminComment?: string; status?: string }>(
  record: T
): Omit<T, "reviewerEmail" | "adminComment" | "status"> {
  const { reviewerEmail, adminComment, status, ...rest } = record;
  return rest;
}