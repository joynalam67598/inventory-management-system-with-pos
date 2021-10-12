export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'dashboard',
    },
    {
        name: 'POS',
        path: '/dashboard',
        icon: 'receipt',
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
        icon: 'work',
        children: [
            {
                name: 'Add Employee',
                path: '/employee/addEmployee',
                icon: 'add_box',
            },
            {
                name: 'All Employee',
                path: '/employee/manageEmployee',
                icon: 'table_chart',
            },
        ],
    },

    {
        name: 'Supplier',
        icon: 'add_shopping_cart',
        children: [
            {
                name: 'Add Supplier',
                path: '/supplier/addSupplier',
                icon: 'add_box',
            },
            {
                name: 'All Supplier',
                path: '/supplier/manageSupplier',
                icon: 'table_chart',
            },
        ],
    },
    {
        name: 'Customer',
        icon: 'shopping_bag',
        children: [
            {
                name: 'Add Customer',
                path: '/customer/addCustomer',
                icon: 'add_box',
            },
            {
                name: 'All Customer',
                path: '/customer/manageCustomer',
                icon: 'table_chart',
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
                icon: 'add_box',
            },
            {
                name: 'All Category',
                path: '/category/manageCategory',
                icon: 'table_chart',
            },
        ],
    },
    {
        name: 'Expense',
        icon: 'event_note',
        children: [
            {
                name: 'Add Expense',
                path: '/expense/addExpense',
                icon: 'add_box',
            },
            {
                name: 'All Expense',
                path: '/expense/manageExpense',
                icon: 'table_chart',
            },
        ],
    },
    {
        name: 'Salary',
        icon: 'payment',
        children: [
            {
                name: 'Pay Advance Salary',
                path: '/salary/advanced-salary/add',
                icon: 'add_box',
            },
            {
                name: 'All Advanced Salary',
                path: '/salary/advanced-salary/manage',
                icon: 'table_chart',
            },
            {
                name: 'Pay Salary',
                path: '/salary/manage',
                iconText: 'T',
            },
        ],
    },
    {
        name: 'Attendance',
        icon: 'fingerprint',
        children: [
            {
                name: 'Take Advance',
                path: '/attendance/take',
                icon: 'add_box',
            },
            {
                name: 'Manage Attendance',
                path: '/attendance/manage',
                icon: 'table_chart',
            },
        ],
    },
    {
        name: 'Sales Report',
        icon: 'assessment',
        children: [
            {
                name: 'Take Advance',
                path: '/attendance/take',
                icon: 'add_box',
            },
            {
                name: 'Manage Attendance',
                path: '/attendance/manage',
                icon: 'table_chart',
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
