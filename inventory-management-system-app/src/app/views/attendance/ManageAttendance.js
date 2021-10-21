import { Button, Card, CardContent } from '@material-ui/core'
import Axios from 'axios'
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Breadcrumb } from '../../components'

export default function ManageAttendance() {
    const [attendances, setAttendances] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [counter, setCounter] = useState(0)
    console.log(attendances)

    const columns = [
        {
            title: 'Attendace Date',
            field: 'att_date',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
    ]

    useEffect(() => {
        async function fetchAttendances() {
            if (counter > 1000) setCounter(0)
            try {
                setLoading(true)
                const res = await Axios.get(
                    'http://localhost:8000/api/attendances'
                )
                if (res.data.status === 200) {
                    setAttendances(res.data.attendances)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err.response.data.errors)
            }
        }
        fetchAttendances()
    }, [counter])

    const deleteAttendance = async (attendance) => {
        try {
            const res = await Axios.get(
                `http://localhost:8000/api/attendance/delete/${attendance.id}`
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
                        { name: 'Attendance', path: '/attendance/manage' },
                        { name: 'Manage Attendance' },
                    ]}
                />
                <Card>
                    <CardContent
                        style={{
                            maxWidth: '900px',
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
                                title="Attendance Table"
                                data={attendances}
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
                                            <Button
                                                style={{
                                                    backgroundColor: '#910cc2',
                                                }}
                                                onClick={() =>
                                                    history.push({
                                                        pathname:
                                                            '/attendance/take',
                                                    })
                                                }
                                            >
                                                Take Attendance
                                                <span>
                                                    <i
                                                        className="material-ui-icon"
                                                        name="add_box"
                                                    ></i>
                                                </span>
                                            </Button>
                                        </div>
                                    ),
                                }}
                                actions={[
                                    {
                                        icon: 'edit',
                                        color: 'secondary',
                                        tooltip: 'Edit Attendance',
                                        onClick: (e, rowData) => {
                                            const attendanceDate =
                                                rowData.att_date
                                            history.push({
                                                pathname: '/attendance/edit',
                                                state: {
                                                    attendanceDate,
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
                                                deleteAttendance(oldData)
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
