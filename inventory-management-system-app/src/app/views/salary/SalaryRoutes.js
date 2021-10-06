import React from 'react'

const salaryRoutes = [
    {
        path: '/salary/advanced-salary/add',
        component: React.lazy(() => import('./AddAdvancedSalary')),
    },
    {
        path: '/salary/advanced-salary/manage',
        component: React.lazy(() => import('./ManageAdvancedSalary')),
    },
    {
        path: '/salary/advanced-salary/edit',
        component: React.lazy(() => import('./EditAdvancedSalary')),
    },
    {
        path: '/salary/manage',
        component: React.lazy(() => import('./PaySalary')),
    },
]

export default salaryRoutes
