
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
      // Custodian page
      {
        path: '/custody',
        name: 'custodian',
        component: () => import('pages/custodian/index.vue'),
        meta: {
          breadcrumb: [
            { name: 'Custodian', icon: 'shield' }
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
        path: '/marketplace/details',
        name: 'marketplace-details',
        props: true,
        component: () => import('pages/marketplace/details-market.vue'),
        meta: {
          breadcrumb: [
            { name: 'Marketplace', icon: 'storefront' },
            { name: 'Detail', icon: 'info' }
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
