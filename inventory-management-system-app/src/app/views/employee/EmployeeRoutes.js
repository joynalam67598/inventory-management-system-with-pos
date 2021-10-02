import React from 'react'

const employeeRoutes = [
    {
        path: '/employee/addEmployee',
        component: React.lazy(() => import('./AddEmployee')),
    },
    {
        path: '/employee/manageEmployee',
        component: React.lazy(() => import('./ManageEmloyee')),
    },
    {
        path: '/employee/edit',
        component: React.lazy(() => import('./EditEmployee')),
    },
]

export default employeeRoutes
