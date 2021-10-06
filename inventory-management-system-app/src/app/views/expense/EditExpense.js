import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField,
} from '@material-ui/core'
import Axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { Breadcrumb } from '../../components'

export default function AddExpense() {
    const history = useHistory()
    const { location } = history
    const { state } = location
    const { oldExpenseData } = state
    const [expense, setExpense] = useState(oldExpenseData)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const validate = (fieldValues = expense) => {
        let errorMessage = { ...errors }
        if ('expense_details' in fieldValues) {
            errorMessage.expense_details = !fieldValues.expense_details
                ? 'Please enter expense details'
                : ''
        }
        if ('exp_amount' in fieldValues) {
            errorMessage.exp_amount = !fieldValues.exp_amount
                ? 'Please enter expense ammount.'
                : ''
        }

        setErrors({ ...errorMessage })
        if (fieldValues === expense) {
            return Object.values(errorMessage).every((x) => x === '')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setExpense({ ...expense, [name]: value })
        validate({ [name]: value })
    }

    const updateExpense = async (e) => {
        e.preventDefault()
        if (validate()) {
            try {
                setLoading(true)
                console.log(expense)
                const res = await Axios.post(
                    'http://localhost:8000/api/expense/update',
                    expense
                )
                if (res.data.status === 200) {
                    Object.keys(expense).forEach((key) => (expense[key] = ''))
                    setLoading(false)
                }
            } catch (err) {
                setErrors({ ...err.response.data.errors })
                setLoading(false)
            }
        }
    }

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Expense', path: '/expense/editExpense' },
                        { name: 'Edit Expense' },
                    ]}
                />
            </div>
            <Card
                style={{
                    backgroundColor: '#212f52',
                    maxWidth: '750px',
                    margin: '0 auto',
                    padding: '0 10px 10px',
                    border: '5px solid',
                }}
            >
                <CardHeader
                    title="Add Expense"
                    style={{
                        borderRadius: '10px',
                        textAlign: 'center',
                        color: 'white',
                    }}
                />

                <CardContent
                    style={{
                        backgroundColor: '#fcfdff',
                        borderRadius: '10px',
                        textAlign: 'center',
                    }}
                >
                    <form onSubmit={updateExpense}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    multiline
                                    maxRows={15}
                                    id="outlined-basic"
                                    label="Expense Details"
                                    variant="outlined"
                                    name="expense_details"
                                    value={expense['expense_details']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    style={{ margin: '.5rem 0' }}
                                    {...(errors.expense_details && {
                                        error: true,
                                        helperText: errors['expense_details'],
                                    })}
                                />
                                <TextField
                                    type="number"
                                    id="outlined-basic"
                                    label="Expense Ammount"
                                    variant="outlined"
                                    name="exp_amount"
                                    style={{ margin: '.5rem 0' }}
                                    value={expense['exp_amount']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.exp_amount && {
                                        error: true,
                                        helperText: errors['exp_amount'],
                                    })}
                                />
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Expense Date"
                                    variant="outlined"
                                    name="date"
                                    style={{ margin: '.5rem 0' }}
                                    value={expense['date']}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} className="text-right">
                                <Button
                                    disabled={loading}
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    style={{
                                        fontSize: '1.1rem',
                                        marginTop: '2px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
