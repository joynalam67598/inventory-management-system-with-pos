import {
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@material-ui/core'
import Axios from 'axios'
import _ from 'lodash'
import { useEffect, useReducer, useState } from 'react'
import { useHistory } from 'react-router'
import { Breadcrumb } from '../../components'

const initialState = null

const reducer = (state, action) => {
    switch (action.type) {
        case 'create':
            let attendanceDataObject = {}
            action.value.map((employee) => {
                attendanceDataObject[employee.id] = {
                    id: employee.id,
                    attendance: '',
                }
            })
            return attendanceDataObject
        case 'assign':
            const newDataObject = _.cloneDeep(action.obj)
            newDataObject[action.index].attendance = action.value
            return newDataObject
        default:
            return state
    }
}

export default function TakeAttendance() {
    const [employeesAttendance, dispatch] = useReducer(reducer, initialState)
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const history = useHistory()

    useEffect(() => {
        async function fetchEmployees() {
            try {
                setLoading(true)
                const res = await Axios.get(
                    'http://localhost:8000/api/employees'
                )
                if (res.data.status === 200) {
                    setEmployees(res.data.employees)
                    dispatch({
                        type: 'create',
                        value: res.data.employees,
                    })
                    setLoading(false)
                }
            } catch (err) {
                console.log(err.response.data.errors)
                setLoading(false)
            }
        }
        fetchEmployees()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        dispatch({
            type: 'assign',
            index: name,
            obj: employeesAttendance,
            value: value,
        })
    }

    const saveAttendance = async (e) => {
        e.preventDefault()
        const data = []
        Object.keys(employeesAttendance).forEach((key) =>
            data.push([
                employeesAttendance[key].id,
                employeesAttendance[key].attendance,
            ])
        )
        try {
            setLoading(true)
            console.log(employeesAttendance)
            console.log(data)
            const res = await Axios.post(
                'http://localhost:8000/api/attendance/add',
                data
            )
            console.log(res)
            if (res.data.status === 200) {
                history.push({
                    pathname: '/attendance/manage',
                })
            }
        } catch (err) {
            setErrors({ ...err.response.data.errors })
            setLoading(false)
        }
    }

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Attendance', path: '/attendance/take' },
                        { name: 'Take Attndance' },
                    ]}
                />
            </div>
            <Card
                style={{
                    backgroundColor: '#212f52',
                    maxWidth: '750px',
                    margin: '0 auto',
                    padding: '0 5px 5px',
                    border: '5px solid',
                }}
            >
                <CardHeader
                    title="Take Attendance"
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
                    <form onSubmit={saveAttendance}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Table
                                    style={{
                                        border: '1px solid',
                                        tableLayout: 'auto',
                                    }}
                                >
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Employee Name</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                        {!loading &&
                                            employees.map((employee) => (
                                                <TableRow>
                                                    <TableCell>
                                                        {employee.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <RadioGroup
                                                            name={employee.id}
                                                            defaultValue={
                                                                employeesAttendance[
                                                                    employee.id
                                                                ].attendance
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            row
                                                            key={employee.id}
                                                        >
                                                            <FormControlLabel
                                                                value="Present"
                                                                control={
                                                                    <Radio
                                                                        required
                                                                    />
                                                                }
                                                                label="Present"
                                                                style={{
                                                                    color: 'green',
                                                                }}
                                                            />
                                                            <FormControlLabel
                                                                style={{
                                                                    color: 'red',
                                                                }}
                                                                value="Absent"
                                                                control={
                                                                    <Radio
                                                                        required
                                                                    />
                                                                }
                                                                label="Absent"
                                                            />
                                                        </RadioGroup>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
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
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
