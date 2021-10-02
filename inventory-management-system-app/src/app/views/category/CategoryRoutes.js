import React from 'react'

const categoryRoutes = [
    {
        path: '/category/addCategory',
        component: React.lazy(() => import('./AddCategory')),
    },
    {
        path: '/category/manageCategory',
        component: React.lazy(() => import('./ManageCategory')),
    },
    {
        path: '/category/edit',
        component: React.lazy(() => import('./EditCategory')),
    },
]

export default categoryRoutes
