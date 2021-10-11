import React from 'react'

const attendanceRoutes = [
    {
        path: '/attendance/take',
        component: React.lazy(() => import('./TakeAttendance')),
    },
    {
        path: '/attendance/manage',
        component: React.lazy(() => import('./ManageAttendance')),
    },
    {
        path: '/attendance/edit',
        component: React.lazy(() => import('./EditAttendance')),
    },
]

export default attendanceRoutes
