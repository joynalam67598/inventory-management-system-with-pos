import React from 'react'

const porintOfSaleRoutes = [
    {
        path: '/pos',
        component: React.lazy(() => import('./PointOfSale')),
    },
]

export default porintOfSaleRoutes
