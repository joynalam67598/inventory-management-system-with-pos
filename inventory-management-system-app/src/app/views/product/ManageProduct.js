import { Card, CardContent } from '@material-ui/core'
import Axios from 'axios'
import MaterialTable from 'material-table'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Breadcrumb } from '../../components'
export default function ManageProduct() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [counter, setCounter] = useState(0)

    const columns = [
        {
            title: 'Product ID',
            field: 'product_code',
            editable: 'never',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Product Name',
            field: 'product_name',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Selling Price',
            field: 'selling_price',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Godown',
            field: 'product_garage',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Route',
            field: 'product_route',
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
                        item.product_image
                            ? `http://localhost:8000/${item.product_image}`
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
        async function fetchEmployees() {
            if (counter > 1000) setCounter(0)
            try {
                setLoading(true)
                const res = await Axios.get(
                    'http://localhost:8000/api/products'
                )
                if (res.data.status === 200) {
                    setProducts(res.data.products)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err.response.data.errors)
            }
        }
        fetchEmployees()
    }, [counter])

    const deleteProduct = async (product) => {
        try {
            const res = await Axios.get(
                `http://localhost:8000/api/product/delete/${product.id}`
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
                        { name: 'Product', path: '/manageProduct' },
                        { name: 'Manage Product' },
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
                                title="Products Table"
                                data={products}
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
                                                        pathname: '/addProduct',
                                                    })
                                                }
                                            >
                                                Add Product
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
                                        tooltip: 'Edit Employee',
                                        onClick: (e, rowData) => {
                                            const oldProductData = rowData

                                            history.push({
                                                pathname: '/editProduct',
                                                state: {
                                                    oldProductData,
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
                                                console.log(oldData)
                                                deleteProduct(oldData)
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
