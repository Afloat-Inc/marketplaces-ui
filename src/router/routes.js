
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/examples',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'polkadot', name: 'polkadot-example', component: () => import('components/template/polkadot-example.vue') },
      { path: 'chart', name: 'chart-example', component: () => import('components/template/chart-example.vue') },
      { path: 'tableTree', name: 'table-tree-example', component: () => import('components/template/table-tree-example.vue') }
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
