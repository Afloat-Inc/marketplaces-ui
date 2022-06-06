
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    name: 'root',
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Index.vue'),
        meta: {
          breadcrumb: [
            { name: 'Home', icon: 'home' }
          ]
        }
      },
      // Marketplace
      {
        path: '/marketplace',
        name: 'marketplace',
        component: () => import('pages/marketplace/index.vue'),
        meta: {
          breadcrumb: [
            { name: 'Marketplace', icon: 'storefront' }
          ]
        }
      },
      {
        path: '/marketplace/enrollment',
        name: 'marketplace-enrollment',
        props: true,
        component: () => import('pages/marketplace/enrollment.vue'),
        meta: {
          breadcrumb: [
            { name: 'Marketplace', icon: 'storefront' }
          ]
        }
      },
      {
        path: 'not-accounts',
        name: 'notAccounts',
        component: () => import('pages/NotAccounts.vue'),
        meta: {
          breadcrumb: [
            { name: 'Vaults', icon: 'storage', to: { name: 'manageVaults' } },
            { name: 'Details', icon: 'summarize' }
          ]
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
