export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'dashboard',
    },
    {
        name: 'POS',
        path: '/pos',
        icon: 'receipt',
    },
    {
        label: '----------------------Pages----------------------',
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
        name: 'Supplier',
        icon: 'add_shopping_cart',
        children: [
            {
                name: 'Add Supplier',
                path: '/supplier/addSupplier',
                iconText: 'SA',
            },
            {
                name: 'All Supplier',
                path: '/supplier/manageSupplier',
                iconText: 'SM',
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
                iconText: 'CA',
            },
            {
                name: 'All Category',
                path: '/category/manageCategory',
                iconText: 'CM',
            },
        ],
    },

    {
        name: 'Brand',
        icon: 'branding_watermark',
        children: [
            {
                name: 'Add Brand',
                path: '/addBrand',
                iconText: 'BA',
            },
            {
                name: 'All Brand',
                path: '/manageBrand',
                iconText: 'BM',
            },
        ],
    },

    {
        name: 'Product',
        icon: 'widgets',
        children: [
            {
                name: 'Add Product',
                path: '/addProduct',
                iconText: 'PA',
            },
            {
                name: 'All Product',
                path: '/manageProduct',
                iconText: 'PL',
            },
        ],
    },
    {
        name: 'Employee',
        icon: 'work',
        children: [
            {
                name: 'Add Employee',
                path: '/employee/addEmployee',
                iconText: 'EA',
            },
            {
                name: 'All Employee',
                path: '/employee/manageEmployee',
                iconText: 'EM',
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
                iconText: 'CA',
            },
            {
                name: 'All Customer',
                path: '/customer/manageCustomer',
                iconText: 'CM',
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
                iconText: 'EA',
            },
            {
                name: 'All Expense',
                path: '/expense/manageExpense',
                iconText: 'EM',
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
                iconText: 'ASP',
            },
            {
                name: 'All Advanced Salary',
                path: '/salary/advanced-salary/manage',
                iconText: 'SM',
            },
            {
                name: 'Pay Salary',
                path: '/salary/manage',
                iconText: 'SP',
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
                iconText: 'AA',
            },
            {
                name: 'Manage Attendance',
                path: '/attendance/manage',
                iconText: 'AM',
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
                iconText: 'AA',
            },
            {
                name: 'Manage Attendance',
                path: '/attendance/manage',
                iconText: 'AM',
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
