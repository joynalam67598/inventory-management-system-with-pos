import React from 'react'

const expenseRoutes = [
    {
        path: '/expense/addExpense',
        component: React.lazy(() => import('./AddExpense')),
    },
    {
        path: '/expense/manageExpense',
        component: React.lazy(() => import('./MangeExpense')),
    },
    {
        path: '/expense/editExpense',
        component: React.lazy(() => import('./EditExpense')),
    },
]

export default expenseRoutes
