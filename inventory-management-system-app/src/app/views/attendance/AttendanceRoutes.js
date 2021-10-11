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
]

export default attendanceRoutes
