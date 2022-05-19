
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
      // XPubs
      {
        path: 'xpub',
        name: 'xpub',
        component: () => import('pages/xpub/manage-xpub.vue'),
        meta: {
          breadcrumb: [
            { name: 'XPUB', icon: 'key' }
          ]
        }
      },
      // Vaults
      {
        path: 'vaults',
        name: 'vaultsList',
        component: () => import('pages/vaults/vault-list.vue'),
        meta: {
          breadcrumb: [
            { name: 'Vaults', icon: 'storage' }
          ]
        }
      },
      {
        path: 'vaults/details',
        name: 'vaultDetails',
        component: () => import('pages/vaults/vault-details.vue'),
        meta: {
          breadcrumb: [
            { name: 'Vaults', icon: 'storage', to: { name: 'vaultsList' } },
            { name: 'Details', icon: 'summarize' }
          ]
        }
      },
      {
        path: 'not-accounts',
        name: 'notAccounts',
        component: () => import('pages/NotAccounts.vue'),
        meta: {
          breadcrumb: [
            { name: 'Vaults', icon: 'storage', to: { name: 'vaultsList' } },
            { name: 'Details', icon: 'summarize' }
          ]
        }
      }
    ]
  },
  // {
  //   path: '/examples',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     {
  //       path: 'polkadot',
  //       name: 'polkadot-example',
  //       component: () => import('components/template/polkadot-example.vue'),
  //       meta: {
  //         breadcrumb: [
  //           { name: 'Examples', icon: 'home' }
  //         ]
  //       }
  //     }
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
