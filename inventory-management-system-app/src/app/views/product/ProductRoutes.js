import React from 'react'

const productRoutes = [
    {
        path: '/addProduct',
        component: React.lazy(() => import('./AddProduct')),
    },
    {
        path: '/manageProduct',
        component: React.lazy(() => import('./ManageProduct')),
    },
    {
        path: '/editProduct',
        component: React.lazy(() => import('./EditProduct')),
    },
]

export default productRoutes
