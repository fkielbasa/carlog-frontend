import { createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import PageNotFound from '../components/PageNotFound.vue'
import { authGuard } from '@/middleware/auth';
import RegisterView from '@/views/RegisterView.vue';
import VehicleView from '@/views/VehicleView.vue';
import SearchVehicleView from '../views/SearchVehicleView.vue'
import VehicleDetails from '../views/VehicleDetails.vue'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true, title: "Dashboard" },
    children: [
      {
        path: '/vehicles',
        name: 'vehicle',
        component: VehicleView,
        meta: { title: "Vehicles", requiresRole: 'CLIENT' }
      },
      {
        path: '/search-vehicle',
        name: 'search-vehicle',
        component: SearchVehicleView,
        meta: { title: 'Search Vehicle', requiresRole: 'MECHANIC' },
      },
      {
        path: '/vehicle/:id/details',
        name: 'details',
        component: VehicleDetails,
        meta: { title: 'Details', requiresRole: 'MECHANIC' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(authGuard);

export default router;
