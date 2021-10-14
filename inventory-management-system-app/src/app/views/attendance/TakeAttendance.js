import {
    Avatar,
    Button,
    CardContent,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Axios from 'axios'
import clsx from 'clsx'
import _ from 'lodash'
import { useEffect, useReducer, useState } from 'react'
import { useHistory } from 'react-router'
import { Breadcrumb, SimpleCard } from '../../components'

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

const useStyles = makeStyles(({ palette, ...theme }) => ({
    attendanceTable: {
        '& small': {
            height: 15,
            width: 50,
            borderRadius: 500,
            boxShadow:
                '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
        },
        '& td': {
            borderBottom: 'none',
        },
        '& td:first-child': {
            paddingLeft: '16px !important',
        },
    },
}))

export default function TakeAttendance() {
    const [employeesAttendance, dispatch] = useReducer(reducer, initialState)
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const history = useHistory()
    const classes = useStyles()

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
            <SimpleCard>
                <CardContent
                    style={{
                        backgroundColor: '#191a38',
                        borderRadius: '10px',
                        textAlign: 'center',
                        border: '3px solid #425df5',
                    }}
                >
                    <div className="flex justify-between items-center px-6 mb-3">
                        <span className="card-title">Employee Attendance</span>
                        <h4>{new Date().toLocaleString('en-US')}</h4>
                    </div>
                    <form onSubmit={saveAttendance}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Table
                                    className={clsx(
                                        'whitespace-pre min-w-400',
                                        classes.attendanceTable
                                    )}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                className="px-0 capitalize"
                                                colSpan={2}
                                                align="left"
                                            >
                                                Employee Name
                                            </TableCell>
                                            <TableCell
                                                className="px-0 capitalize"
                                                colSpan={2}
                                                align="left"
                                            >
                                                Employee Image
                                            </TableCell>
                                            <TableCell
                                                className="px-0 capitalize"
                                                colSpan={2}
                                                align="left"
                                            >
                                                Status
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {!loading &&
                                            employees.map((employee, index) => (
                                                <TableRow key={index} hover>
                                                    <TableCell
                                                        className="px-0 capitalize"
                                                        colSpan={2}
                                                        align="left"
                                                    >
                                                        {employee.name}
                                                    </TableCell>
                                                    <TableCell
                                                        className="px-0 capitalize"
                                                        colSpan={2}
                                                        align="center"
                                                    >
                                                        <Avatar
                                                            src={
                                                                employee[
                                                                    'photo'
                                                                ]
                                                                    ? `http://localhost:8000/${employee['photo']}`
                                                                    : `http://localhost:8000/dummy.png`
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        className="px-0 capitalize"
                                                        colSpan={2}
                                                        align="center"
                                                    >
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
            </SimpleCard>
        </div>
    )
}
