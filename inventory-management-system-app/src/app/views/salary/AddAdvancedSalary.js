import {
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    Grid,
    InputLabel,
    Select,
    TextField,
} from '@material-ui/core'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { Breadcrumb } from '../../components'

export default function AddAdvancedSalary() {
    const [advanceSalary, setAdvanceSalary] = useState({
        employee_id: '',
        month: '',
        year: '',
        advance_salary: '',
    })
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        async function fetchEmployees() {
            try {
                setLoading(true)
                const res = await Axios.get(
                    'http://localhost:8000/api/employees'
                )
                if (res.data.status === 200) {
                    setEmployees(res.data.employees)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err.response.data.errors)
                setLoading(false)
            }
        }
        fetchEmployees()
    }, [])

    const validate = (fieldValues = advanceSalary) => {
        let errorMessage = { ...errors }
        if ('employee_id' in fieldValues) {
            errorMessage.employee_id = !fieldValues.employee_id
                ? 'Please select a employee.'
                : ''
        }
        if ('month' in fieldValues) {
            errorMessage.month = fieldValues.month
                ? ''
                : 'Please select advance salary month'
        }
        if ('advance_salary' in fieldValues) {
            errorMessage.advance_salary = !fieldValues.advance_salary
                ? 'Please enter advance salary ammount.'
                : ''
        }
        if ('year' in fieldValues) {
            errorMessage.year = !fieldValues.year
                ? 'Please enter advance salary year.'
                : ''
        }

        setErrors({ ...errorMessage })
        if (fieldValues === advanceSalary) {
            return Object.values(errorMessage).every((x) => x === '')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setAdvanceSalary({ ...advanceSalary, [name]: value })
        validate({ [name]: value })
    }

    const saveAdvanceSalary = async (e) => {
        e.preventDefault()
        if (validate()) {
            try {
                setLoading(true)
                console.log(advanceSalary)
                const res = await Axios.post(
                    'http://localhost:8000/api/advanced/salary/add',
                    advanceSalary
                )
                if (res.data.status === 200) {
                    Object.keys(advanceSalary).forEach(
                        (key) => (advanceSalary[key] = '')
                    )
                    setLoading(false)
                }
            } catch (err) {
                setErrors({ ...err.response.data.errors })
                setLoading(false)
            }
        }
    }

    return (
        <div classname="m-sm-30">
            <div classname="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        {
                            name: 'Advance Salary',
                            path: '/advanced/Salary/addadvanceSalary',
                        },
                        { name: 'Pay Advance Salary' },
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
                    title="Pay Advance Salary"
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
                    <form
                        onSubmit={saveAdvanceSalary}
                        encmonth="multipart/form-data"
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor="advanceSalarymonth">
                                        {'Employee'}
                                    </InputLabel>
                                    <Select
                                        native
                                        style={{
                                            margin: '.7rem 0',
                                            textAlign: 'left',
                                        }}
                                        required
                                        fullWidth
                                        variant="outlined"
                                        name="employee_id"
                                        onChange={handleChange}
                                        value={advanceSalary['employee_id']}
                                        {...(errors.employee_id && {
                                            error: true,
                                            helperText: errors['employee_id'],
                                        })}
                                    >
                                        <option disabled />
                                        {employees.map((employee) => (
                                            <option
                                                value={employee.id}
                                                key={employee.id}
                                            >
                                                {'name: ' +
                                                    employee.name +
                                                    ', ' +
                                                    'NID: ' +
                                                    employee.nid_no}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor="advanceSalarymonth">
                                        {'Advance salary month'}
                                    </InputLabel>
                                    <Select
                                        native
                                        style={{
                                            margin: '.7rem 0',
                                            textAlign: 'left',
                                        }}
                                        required
                                        fullWidth
                                        variant="outlined"
                                        name="month"
                                        onChange={handleChange}
                                        value={advanceSalary['month']}
                                        {...(errors.month && {
                                            error: true,
                                            helperText: errors['month'],
                                        })}
                                    >
                                        <option disabled />
                                        <option value="January">
                                            {'January'}
                                        </option>
                                        <option value="February">
                                            {'February'}
                                        </option>
                                        <option value="March">{'March'}</option>
                                        <option value="May">{'May'}</option>
                                        <option value="June">{'June'}</option>
                                        <option value="July">{'July'}</option>
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

                                <TextField
                                    type="number"
                                    rows="4"
                                    id="outlined-basic"
                                    label="Year"
                                    variant="outlined"
                                    name="year"
                                    style={{ margin: '0.7rem 0' }}
                                    value={advanceSalary['year']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.year && {
                                        error: true,
                                        helperText: errors['year'],
                                    })}
                                />

                                <TextField
                                    type="number"
                                    id="outlined-basic"
                                    label="Advance Salary Ammount"
                                    variant="outlined"
                                    name="advance_salary"
                                    style={{ margin: '.7rem 0' }}
                                    value={advanceSalary['advance_salary']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.advance_salary && {
                                        error: true,
                                        helperText: errors['advance_salary'],
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} classname="text-right">
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
                                    Pay
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
