import { Card, CardContent } from '@material-ui/core'
import Axios from 'axios'
import MaterialTable from 'material-table'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Breadcrumb } from '../../components'

export default function ManageBrand() {
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [counter, setCounter] = useState(0)

    const columns = [
        {
            title: 'brand ID',
            field: 'id',
            editable: 'never',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Brand Name',
            field: 'name',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Category',
            field: 'category_name',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Supplier Name',
            field: 'sup_name',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Supplier Phone',
            field: 'phone',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
    ]

    useEffect(() => {
        async function fetchBrands() {
            if (counter > 1000) setCounter(0)
            try {
                setLoading(true)
                const res = await Axios.get('http://localhost:8000/api/brands')
                if (res.data.status === 200) {
                    setBrands(res.data.brands)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err.response.data.errors)
            }
        }
        fetchBrands()
    }, [counter])

    const deleteBrand = async (brand) => {
        try {
            const res = await Axios.get(
                `http://localhost:8000/api/employee/delete/${brand.id}`
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
                        { name: 'Brand', path: '/manageBrand' },
                        { name: 'Manage Brand' },
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
                                    border: '1px solid #425df5',
                                }}
                                title="Brand Table"
                                data={brands}
                                columns={columns}
                                options={{
                                    exportButton: true,
                                    actionsColumnIndex: -1,
                                    headerStyle: {
                                        backgroundColor: '#425df5',
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
                                                            '/addBrand',
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
                                            const oldBrandData = rowData
                                            history.push({
                                                pathname: '/editBrand',
                                                state: {
                                                    oldBrandData,
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
                                                deleteBrand(oldData)
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
