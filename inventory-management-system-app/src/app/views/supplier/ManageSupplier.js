import { Avatar, Button, Card, CardContent } from '@material-ui/core'
import Axios from 'axios'
import MaterialTable from 'material-table'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Breadcrumb } from '../../components'

export default function ManageSupplier() {
    const [suppliers, setSuppliers] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [counter, setCounter] = useState(0)

    const columns = [
        {
            title: 'ID',
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
            title: 'Type',
            field: 'type',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Image',
            field: 'photo',
            render: (item) => (
                <Avatar
                    src={
                        item.photo
                            ? `http://localhost:8000/${item.photo}`
                            : `http://localhost:8000/dummy.png`
                    }
                />
            ),
            cellStyle: {
                textAlign: 'center',
            },
        },
    ]

    useEffect(() => {
        async function fetchSupplier() {
            if (counter > 1000) setCounter(0)
            try {
                setLoading(true)
                const res = await Axios.get(
                    'http://localhost:8000/api/suppliers'
                )
                if (res.data.status === 200) {
                    setSuppliers(res.data.suppliers)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err.response.data.errors)
            }
        }
        fetchSupplier()
    }, [counter])

    const deleteSupplier = async (supplier) => {
        try {
            const res = await Axios.get(
                `http://localhost:8000/api/supplier/delete/${supplier.id}`
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
                        { name: 'Supplier', path: '/supplier/manageSupplier' },
                        { name: 'Manage Supplier' },
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
                                title="Supplier Table"
                                data={suppliers}
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
                                                            '/supplier/addSupplier',
                                                    })
                                                }
                                            >
                                                Add Supplier
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
                                        tooltip: 'Edit Supplier',
                                        onClick: (e, rowData) => {
                                            const oldSupplierData = rowData
                                            history.push({
                                                pathname: '/supplier/edit',
                                                state: {
                                                    oldSupplierData,
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
                                                deleteSupplier(oldData)
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
