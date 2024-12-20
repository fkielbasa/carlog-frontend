import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};
export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (to.path === '/login' || to.path === '/register') {
    next();
  } else if (!isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
};
