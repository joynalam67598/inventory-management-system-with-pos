import React from 'react'

const brandRoutes = [
    {
        path: '/addBrand',
        component: React.lazy(() => import('./AddBrand')),
    },
    {
        path: '/manageBrand',
        component: React.lazy(() => import('./ManageBrand')),
    },
    {
        path: '/editBrand',
        component: React.lazy(() => import('./EditBrand')),
    },
]

export default brandRoutes
