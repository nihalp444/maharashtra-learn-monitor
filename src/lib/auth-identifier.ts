export function identifierToEmail(identifier: string) {
  const normalized = identifier.trim().toLowerCase();
  const digits = normalized.replace(/\D/g, "");

  if (digits.length === 10 || (digits.length === 12 && digits.startsWith("91"))) {
    const mobile = digits.length === 12 ? digits.slice(2) : digits;
    return `${mobile}@mobile.mbocwwb.gov.in`;
  }

  const username = normalized.replace(/[^a-z0-9._-]/g, "");
  return `${username}@user.mbocwwb.gov.in`;
}