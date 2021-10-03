import { Card, CardContent } from '@material-ui/core'
import Axios from 'axios'
import MaterialTable from 'material-table'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Breadcrumb } from '../../components'

export default function ManageCustomer() {
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [counter, setCounter] = useState(0)

    const columns = [
        {
            title: 'Customer ID',
            field: 'id',
            editable: 'never',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Name',
            field: 'name',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Phone',
            field: 'phone',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Address',
            field: 'address',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Image',
            field: 'photo',
            render: (item) => (
                <img
                    src={
                        item.photo
                            ? `http://localhost:8000/${item.photo}`
                            : `http://localhost:8000/dummy.png`
                    }
                    alt=""
                    border="3"
                    height="70"
                    width="80"
                    border="0"
                />
            ),
            cellStyle: {
                textAlign: 'center',
            },
        },
    ]

    useEffect(() => {
        async function fetchCustomers() {
            if (counter > 1000) setCounter(0)
            try {
                setLoading(true)
                const res = await Axios.get(
                    'http://localhost:8000/api/customers'
                )
                if (res.data.status === 200) {
                    setCustomers(res.data.customers)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err.response.data.errors)
            }
        }
        fetchCustomers()
    }, [counter])

    const deleteCustomer = async (customer) => {
        try {
            const res = await Axios.get(
                `http://localhost:8000/api/employee/delete/${customer.id}`
            )
            if (res.data.status === 200) {
                console.log(res.data.message)
                setLoading(false)
            }
        } catch (err) {
            console.log(err.response.data.errors)
        }
    }

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Customer', path: '/customer/manageCustomers' },
                        { name: 'Manage Customers' },
                    ]}
                />
                <Card>
                    <CardContent
                        style={{
                            margin: '0 auto',
                            padding: '25px 35px',
                        }}
                    >
                        {!loading && (
                            <MaterialTable
                                style={{
                                    textAlign: 'center',
                                    boxShadow:
                                        '5px 6px 6px 5px rgba(0, 0, 0, 0.2)',
                                    border: '3px solid #212f52',
                                }}
                                title="Customer Table"
                                data={customers}
                                columns={columns}
                                options={{
                                    exportButton: true,
                                    actionsColumnIndex: -1,
                                    headerStyle: {
                                        backgroundColor: '#2abdf7',
                                        color: 'white',
                                        textAlign: 'center',
                                        fontSize: '1.15rem',
                                    },
                                }}
                                icons={{
                                    Add: (props) => (
                                        <div>
                                            <button
                                                style={{
                                                    padding: '7px 5px',
                                                    fontSize: '1.1rem',
                                                    borderRadius: '12px',
                                                    backgroundColor: '#910cc2',
                                                    boxShadow:
                                                        '2px 4px 8px 2px rgba(0, 0, 0, 0.2)',
                                                    color: 'white',
                                                }}
                                                onClick={() =>
                                                    history.push({
                                                        pathname:
                                                            '/customer/addCustomer',
                                                    })
                                                }
                                            >
                                                Add Customer
                                                <span>
                                                    <i
                                                        className="material-ui-icon"
                                                        name="add_box"
                                                    ></i>
                                                </span>
                                            </button>
                                        </div>
                                    ),
                                }}
                                actions={[
                                    {
                                        icon: 'edit',
                                        color: 'secondary',
                                        tooltip: 'Edit Customer',
                                        onClick: (e, rowData) => {
                                            const oldCustomerData = rowData
                                            history.push({
                                                pathname: '/customer/edit',
                                                state: {
                                                    oldCustomerData,
                                                },
                                            })
                                        },
                                    },
                                ]}
                                editable={{
                                    onRowAdd: {},
                                    onRowDelete: (oldData) =>
                                        new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                deleteCustomer(oldData)
                                                setCounter(
                                                    (prevCounter) =>
                                                        prevCounter + 1
                                                )
                                                resolve()
                                            }, 1000)
                                        }),
                                }}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
