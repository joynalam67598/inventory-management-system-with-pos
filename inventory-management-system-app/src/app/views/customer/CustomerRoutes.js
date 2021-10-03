import React from 'react'

const customerRoutes = [
    {
        path: '/customer/addCustomer',
        component: React.lazy(() => import('./AddCustomer')),
    },
    {
        path: '/customer/manageCustomer',
        component: React.lazy(() => import('./ManageCustomer')),
    },
    {
        path: '/customer/edit',
        component: React.lazy(() => import('./EditCustomer')),
    },
]

export default customerRoutes
