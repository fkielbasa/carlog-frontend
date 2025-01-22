import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

const getUserRole = (): string | null => {
  return localStorage.getItem('role');
};

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const isLoggedIn = isAuthenticated();
  const userRole = getUserRole();

  if (!isLoggedIn && to.path !== '/login' && to.path !== '/register') {
    return next('/login');
  }

  if (isLoggedIn && (to.path === '/login' || to.path === '/register')) {
    return next('/');
  }

  if (to.meta.requiresRole && to.meta.requiresRole !== userRole) {
    console.warn(`Access denied: ${userRole} cannot access ${to.path}`);
    return next('/');
  }
  next();
};
