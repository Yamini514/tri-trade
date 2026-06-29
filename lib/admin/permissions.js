/**
 * Permission matching for the UI. The backend (models/concerns/roles.rb) is the
 * single source of truth and ships each user's granted permissions in
 * `user.permissions`. This module only implements the *matching* rules so the
 * UI can gate rendering — it never hardcodes the matrix itself.
 *
 * Permission strings are `<resource>.<action>`. Wildcards:
 *   "*"          -> everything (super admin)
 *   "users.*"    -> all actions on a resource
 */

export function hasPermission(permissions, required) {
  if (!required) return true;
  if (!Array.isArray(permissions)) return false;
  if (permissions.includes("*")) return true;
  if (permissions.includes(required)) return true;
  const resource = required.split(".")[0];
  return permissions.includes(`${resource}.*`);
}

/** True if the user has at least one of the required permissions. */
export function hasAnyPermission(permissions, required) {
  if (!required || required.length === 0) return true;
  return required.some((p) => hasPermission(permissions, p));
}

export const ROLE_LABELS = {
  super_admin: "Super Admin",
  admin: "Admin",
  support: "Support",
  finance: "Finance",
  viewer: "Viewer",
};
