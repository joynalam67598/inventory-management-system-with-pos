import {
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
} from '@material-ui/core'
import Axios from 'axios'
import MaterialTable, { MTableToolbar } from 'material-table'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Breadcrumb } from '../../components'

export default function ManageSupplier() {
    const [expenses, setExpenses] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [counter, setCounter] = useState(0)
    const [month, setMonth] = useState('')

    const columns = [
        {
            title: 'ID',
            field: 'id',
            editable: 'never',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
                borderRight: '2px solid #e5e5e5',
            },
        },
        {
            title: 'Details',
            field: 'expense_details',
            cellStyle: {
                textAlign: 'center',
                maxWidth: '325px',
                fontSize: '1rem',
                borderRight: '2px solid #e5e5e5',
            },
        },
        {
            title: 'Amount',
            field: 'exp_amount',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
                borderRight: '2px solid #e5e5e5',
            },
        },
        {
            title: 'Date',
            field: 'date',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
                borderRight: '2px solid #e5e5e5',
            },
        },
    ]

    useEffect(() => {
        async function fetchExpenses() {
            if (counter > 1000) setCounter(0)
            try {
                setLoading(true)
                const res = await Axios.get(
                    `http://localhost:8000/api/expenses/${month}`
                )
                if (res.data.status === 200) {
                    setExpenses(res.data.expenses)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err.response.data.errors)
            }
        }
        fetchExpenses()
    }, [month])

    useEffect(() => {
        async function fetchExpenses() {
            if (counter > 1000) setCounter(0)
            try {
                setLoading(true)
                const res = await Axios.get(
                    'http://localhost:8000/api/expenses'
                )
                if (res.data.status === 200) {
                    setExpenses(res.data.expenses)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err.response.data.errors)
            }
        }
        fetchExpenses()
    }, [counter])

    const deleteExpense = async (expense) => {
        try {
            const res = await Axios.get(
                `http://localhost:8000/api/expense/delete/${expense.id}`
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
                        { name: 'Expense', path: '/supplier/manageExpenses' },
                        { name: 'Manage Expense' },
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
                                    boxShadow:
                                        '5px 6px 6px 5px rgba(0, 0, 0, 0.2)',
                                    border: '3px solid #212f52',
                                }}
                                title={
                                    'Expenses Table'
                                    //     (' +
                                    // new Date().toLocaleString('en-US', {
                                    //     day: '2-digit',
                                    // }) +
                                    // ' ' +
                                    // new Date().toLocaleString('en-US', {
                                    //     month: 'long',
                                    // }) +
                                    // ' ' +
                                    // new Date().getFullYear() +
                                    // ' )'
                                }
                                data={expenses}
                                columns={columns}
                                options={{
                                    exportButton: true,
                                    actionsColumnIndex: -1,
                                    pageSize: 10,
                                    maxBodyHeight: '500px',
                                    headerStyle: {
                                        borderRight: '2px solid #e5e5e5',
                                        backgroundColor: '#212f52',
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
                                                            '/expense/addExpense',
                                                    })
                                                }
                                            >
                                                {'Add Expense'}
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
                                        tooltip: 'Edit Supplier',
                                        onClick: (e, rowData) => {
                                            const oldExpenseData = rowData
                                            history.push({
                                                pathname:
                                                    '/expense/editExpense',
                                                state: {
                                                    oldExpenseData,
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
                                                deleteExpense(oldData)
                                                setCounter(
                                                    (prevCounter) =>
                                                        prevCounter + 1
                                                )
                                                resolve()
                                            }, 1000)
                                        }),
                                }}
                                components={{
                                    Toolbar: (props) => (
                                        <div>
                                            <MTableToolbar {...props} />
                                            <FormControl
                                                variant="outlined"
                                                maxWidth="800px"
                                                maxBodyHeight="100px"
                                            >
                                                <InputLabel htmlFor="advanceSalarymonth">
                                                    {'Expense Month'}
                                                </InputLabel>
                                                <Select
                                                    native
                                                    style={{
                                                        textAlign: 'left',
                                                        margin: '0.7rem',
                                                    }}
                                                    name="month"
                                                    value={month}
                                                    onChange={(e) =>
                                                        setMonth(e.target.value)
                                                    }
                                                >
                                                    <option disabled />
                                                    <option value="January">
                                                        {'January'}
                                                    </option>
                                                    <option value="February">
                                                        {'February'}
                                                    </option>
                                                    <option value="March">
                                                        {'March'}
                                                    </option>
                                                    <option value="May">
                                                        {'May'}
                                                    </option>
                                                    <option value="June">
                                                        {'June'}
                                                    </option>
                                                    <option value="July">
                                                        {'July'}
                                                    </option>
                                                    <option value="August">
                                                        {'August'}
                                                    </option>
                                                    <option value="September">
                                                        {'September'}
                                                    </option>
                                                    <option value="October">
                                                        {'October'}
                                                    </option>
                                                    <option value="November">
                                                        {'November'}
                                                    </option>
                                                    <option value="December">
                                                        {'December'}
                                                    </option>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    ),
                                }}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
