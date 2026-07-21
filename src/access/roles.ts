import type { Access, FieldAccess, PayloadRequest } from 'payload';

export type AppRole = 'super-admin' | 'editor';

export type AppUser = {
  id: number | string;
  email?: string;
  role?: AppRole;
  collection?: string;
};

export function getUser(req: PayloadRequest): AppUser | null {
  return (req.user as AppUser | null) ?? null;
}

export function isLoggedIn({ req }: { req: PayloadRequest }): boolean {
  return Boolean(req.user);
}

export function isSuperAdmin({ req }: { req: PayloadRequest }): boolean {
  return getUser(req)?.role === 'super-admin';
}

export function isEditorOrAdmin({ req }: { req: PayloadRequest }): boolean {
  const role = getUser(req)?.role;
  return role === 'super-admin' || role === 'editor';
}

/** Public read OR authenticated CMS users. */
export const anyone: Access = () => true;

/** Authenticated editors and admins. */
export const authenticated: Access = ({ req }) => isLoggedIn({ req });

/** Super Admin only (Site Settings, users management). */
export const superAdminOnly: Access = ({ req }) => isSuperAdmin({ req });

/** Editors and Super Admins can manage content. */
export const editorsAndAdmins: Access = ({ req }) => isEditorOrAdmin({ req });

export const superAdminFieldAccess: FieldAccess = ({ req }) => isSuperAdmin({ req });
