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
import Profile from '../views/Profile.vue'
import Service from '../components/VehicleService.vue'
import Services from '../components/Services.vue'
import StartView from '../views/StartView.vue'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true,},
    children: [
      {
        path: '',
        name: 'start',
        component: StartView,
        meta: { title: 'Start' },
      },
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
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: { title: 'Profile'}
      },
      {
        path: '/vehicle/:id/services',
        name: 'vehicle-services',
        component: Service,
        meta: { title: 'Vehicle Service', requiresRole: 'CLIENT'}
      },
      {
        path: '/services',
        name: 'Services',
        component: Services,
        meta: { title: 'Services', requiresRole: 'CLIENT'}
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
