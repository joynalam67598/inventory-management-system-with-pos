import { Card, CardContent } from '@material-ui/core'
import Axios from 'axios'
import MaterialTable, { MTableToolbar } from 'material-table'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { useHistory } from 'react-router-dom'
import { Breadcrumb } from '../../components'

export default function ManageSupplier() {
    const [expenses, setExpenses] = useState([])
    const [total_expenses, setTotalExpenses] = useState(0)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [counter, setCounter] = useState(0)
    const [month, setMonth] = useState('')
    const [expenseDate, setExpenseDate] = useState([new Date(), new Date()])
    const [startDate, endDate] = expenseDate

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
                maxWidth: '425px',
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
            if (expenseDate[0] && expenseDate[1]) {
                const formDate =
                    expenseDate[0].getDate() +
                    '-' +
                    (expenseDate[0].getMonth() + 1) +
                    '-' +
                    expenseDate[0].getFullYear()
                const toDate =
                    expenseDate[1].getDate() +
                    '-' +
                    (expenseDate[1].getMonth() + 1) +
                    '-' +
                    expenseDate[1].getFullYear()
                try {
                    setLoading(true)
                    const res = await Axios.get(
                        `http://localhost:8000/api/expenses/${formDate}/${toDate}`
                    )
                    console.log(res)
                    if (res.data.status === 200) {
                        setExpenses(res.data.expensesInRange)
                        setTotalExpenses(res.data.total_expense)
                        setLoading(false)
                    }
                } catch (err) {
                    console.log(err.response.data.errors)
                }
            }
        }
        fetchExpenses()
    }, [expenseDate])

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
                        <div
                            style={{
                                border: '3px solid #212f52',
                                borderRadius: '5px',
                                boxShadow: '0 0 12px rgba(27, 37, 0, 0.16)',
                                overflow: 'hidden',
                                margin: '6px 0 8px 0',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    float: 'left',
                                    margin: '.7rem',
                                }}
                            >
                                <h4
                                    style={{
                                        color: 'blue',
                                        margin: '0 .5rem 0 0',
                                    }}
                                >
                                    {'Date Range: '}
                                </h4>
                                <DatePicker
                                    maxWidth="500px"
                                    selectsRange={true}
                                    todayButton="Today"
                                    startDate={startDate}
                                    endDate={endDate}
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    maxDate={new Date()}
                                    onChange={(date) => {
                                        setExpenseDate(date)
                                    }}
                                    withPortal
                                />
                            </div>
                            <div
                                style={{
                                    float: 'right',
                                    margin: '.7rem',
                                    textAlign: 'center',
                                }}
                            >
                                <h4
                                    style={{
                                        color: 'red',
                                        textShadow:
                                            '0 6px 12px rgba(27, 37, 86, 0.16)',
                                    }}
                                >{`Total Expense: ${total_expenses}`}</h4>
                            </div>
                        </div>
                        <MaterialTable
                            style={{
                                boxShadow: '5px 6px 6px 5px rgba(0, 0, 0, 0.2)',
                                border: '3px solid #212f52',
                            }}
                            title={'Expenses Table'}
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
                                                backgroundColor: '#910cc2',
                                                borderRadius: '10px',
                                                boxShadow:
                                                    '0 6px 12px rgba(27, 37, 86, 0.16)',
                                                overflow: 'hidden',
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
                                            pathname: '/expense/editExpense',
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
                                                (prevCounter) => prevCounter + 1
                                            )
                                            resolve()
                                        }, 1000)
                                    }),
                            }}
                            components={{
                                Toolbar: (props) => (
                                    <div>
                                        <MTableToolbar {...props} />
                                    </div>
                                ),
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
