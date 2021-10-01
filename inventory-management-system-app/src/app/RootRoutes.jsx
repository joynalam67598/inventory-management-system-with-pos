import React from 'react'
import { Redirect } from 'react-router-dom'
import dashboardRoutes from './dashboard/DashboardRoutes'
import categoryRoutes from './views/category/CategoryRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard/default" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...categoryRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
