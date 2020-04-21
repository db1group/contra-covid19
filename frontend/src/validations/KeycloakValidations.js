export const isSecretariaSaude = (scope) => {
  if (!scope.$keycloak) return false;
  return scope.$keycloak.hasRealmRole('SECRETARIA_SAUDE');
};

export function isAuthenticated(scope) {
  if (!scope.$keycloak) return false;
  return scope.$keycloak.authenticated;
}

export default {
  isSecretariaSaude,
  isAuthenticated,
};
