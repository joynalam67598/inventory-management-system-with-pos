import React from 'react'

const supplierRoutes = [
    {
        path: '/supplier/addSupplier',
        component: React.lazy(() => import('./AddSupplier')),
    },
    {
        path: '/supplier/manageSupplier',
        component: React.lazy(() => import('./ManageSupplier')),
    },
    {
        path: '/supplier/edit',
        component: React.lazy(() => import('./EditSupplier')),
    },
]

export default supplierRoutes
