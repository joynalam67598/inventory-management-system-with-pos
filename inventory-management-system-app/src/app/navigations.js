export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'dashboard',
    },
    {
        label: 'Pages',
        type: 'label',
    },
    // {
    //     name: 'Session/Auth',
    //     icon: 'security',
    //     children: [
    //         {
    //             name: 'Sign in',
    //             iconText: 'SI',
    //             path: '/session/signin',
    //         },
    //         {
    //             name: 'Sign up',
    //             iconText: 'SU',
    //             path: '/session/signup',
    //         },
    //         {
    //             name: 'Forgot Password',
    //             iconText: 'FP',
    //             path: '/session/forgot-password',
    //         },
    //         {
    //             name: 'Error',
    //             iconText: '404',
    //             path: '/session/404',
    //         },
    //     ],
    // },

    {
        name: 'Category',
        icon: 'category',
        children: [
            {
                name: 'Add Category',
                path: '/category/addCategory',
                iconText: 'T',
            },
            {
                name: 'All Category',
                path: '/category/manageCategory',
                iconText: 'T',
            },
        ],
    },
    {
        name: 'Employee',
        icon: 'group',
        children: [
            {
                name: 'Add Employee',
                path: '/employee/addEmployee',
                iconText: 'S',
            },
            {
                name: 'All Employee',
                path: '/employee/manageEmployee',
                iconText: 'S',
            },
        ],
    },
    {
        name: 'Documentation',
        icon: 'launch',
        type: 'extLink',
        path: 'http://demos.ui-lib.com/matx-react-doc/',
    },
]
