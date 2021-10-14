import React from 'react'
import { authRoles } from '../auth/authRoles'

const dashboardRoutes = [
    {
        path: '/dashboard',
        component: React.lazy(() => import('./Analytics2')),
        auth: authRoles.sa,
    },
]

export default dashboardRoutes
