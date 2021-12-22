import { createRouter, createWebHistory } from 'vue-router'
import firebase from 'firebase/compat/app';

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/history',
    name: 'History',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/History.vue')
  },
  {
    path: '/detail-record/:id',
    name: 'Detail record',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/DetailRecord.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/About.vue')
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/record',
    name: 'Record',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Record.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {layout: 'empty'},
    component: () => import('../views/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) =>{
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  document.title = to.name

  if(requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router