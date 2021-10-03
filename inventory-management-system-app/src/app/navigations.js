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
        name: 'Customer',
        icon: 'sell',
        children: [
            {
                name: 'Add Customer',
                path: '/customer/addCustomer',
                iconText: 'S',
            },
            {
                name: 'All Customer',
                path: '/customer/manageCustomer',
                iconText: 'S',
            },
        ],
    },
    {
        name: 'Supplier',
        icon: 'person',
        children: [
            {
                name: 'Add Supplier',
                path: '/supplier/addSupplier',
                iconText: 'S',
            },
            {
                name: 'All Supplier',
                path: '/supplier/manageSupplier',
                iconText: 'S',
            },
        ],
    },

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
        name: 'Documentation',
        icon: 'launch',
        type: 'extLink',
        path: 'http://demos.ui-lib.com/matx-react-doc/',
    },
]
