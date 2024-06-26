export const roleErrors = {
  roleWithNameExists: (name: string) =>
    `A role with name '${name}' already exists.`,
  roleNotFound: `Role not found.`,
  defaultRoleNotEdictable: `Default roles cannot be edited.`,
};
