import {
    Button,
    ButtonGroup,
    CircularProgress,
    Grid,
    TextField
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import Axios from 'axios'
import MaterialTable from 'material-table'
import { Fragment, useEffect, useState } from 'react'
import { useCart } from 'react-use-cart'
import { SimpleCard } from '../../components'

export default function PointOfSale() {
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])
    const [customers, setCustomers] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [open, setOpen] = useState(false)
    const { addItem } = useCart()
    const {
        items,
        isEmpty,
        totalItems,
        totalUniqueItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart()

    useEffect(() => {
        async function fetchSuppliersAndCategoris() {
            try {
                setLoading(true)
                const res1 = await Axios.get('http://localhost:8000/api/brands')
                const res2 = await Axios.get(
                    'http://localhost:8000/api/categories'
                )
                const res3 = await Axios.get(
                    'http://localhost:8000/api/customers'
                )
                if (
                    res1.data.status === 200 &&
                    res2.data.status === 200 &&
                    res3.data.status === 200
                ) {
                    setBrands(res1.data.brands)
                    setCategories(res2.data.categories)
                    setCustomers(res3.data.customers)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err.response.data.errors)
                setLoading(false)
            }
        }
        fetchSuppliersAndCategoris()
    }, [])

    useEffect(() => {
        async function fetchProducts() {
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
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const columns = [
        {
            title: 'Name',
            field: 'product_name',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Price',
            field: 'price',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Quantity',
            render: (item) => (
                <ButtonGroup disableElevation variant="contained" size="small">
                    <Button
                        onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                        }
                    >
                        {'-'}
                    </Button>
                    <div style={{ border: '2px solid gray' }}>
                        {item.quantity}
                    </div>
                    <Button
                        onClick={() =>
                            updateItemQuantity(item.id, item.quantity + 1)
                        }
                    >
                        {'+'}
                    </Button>
                </ButtonGroup>
            ),
            cellStyle: {
                textAlign: 'center',
            },
        },
        {
            title: 'Net Price',
            render: (item) => item.quantity * item.price,
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
                    height="40rem"
                    width="40rem"
                    border="0"
                />
            ),
            cellStyle: {
                textAlign: 'center',
            },
        },
    ]

    return (
        <SimpleCard>
            <Grid container>
                <Grid item xs={8}>
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <Autocomplete
                                id="asynchronous-demo"
                                getOptionSelected={(option, value) =>
                                    option.name === value.id
                                }
                                getOptionLabel={(option) =>
                                    option.name + ' ( ' + option.phone + ' )'
                                }
                                options={customers}
                                loading={loading}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Customer"
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <Fragment>
                                                    {loading ? (
                                                        <CircularProgress
                                                            color="inherit"
                                                            size={20}
                                                        />
                                                    ) : null}
                                                    {
                                                        params.InputProps
                                                            .endAdornment
                                                    }
                                                </Fragment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <button
                                style={{
                                    padding: '8px 5px',
                                    fontSize: '1rem',
                                    borderRadius: '5px',
                                    backgroundColor: '#910cc2',
                                    boxShadow:
                                        '2px 4px 8px 2px rgba(0, 0, 0, 0.2)',
                                    color: 'white',
                                }}
                            >
                                {'Add Customer'}
                            </button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialTable
                            style={{
                                margin: '10px 30px 5px 0px',
                                border: '3px solid #3a0dbf',
                            }}
                            title="Cart"
                            data={items}
                            columns={columns}
                            options={{
                                exportButton: true,
                                actionsColumnIndex: -1,
                                pageSize: 10,
                                maxBodyHeight: '500px',
                                headerStyle: {
                                    backgroundColor: '#2abdf7',
                                    color: 'white',
                                    textAlign: 'center',
                                    fontSize: '1.15rem',
                                },
                            }}
                            editable={{
                                onRowDelete: (oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            resolve()
                                        }, 1000)
                                    }),
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Autocomplete
                                id="asynchronous-demo"
                                getOptionSelected={(option, value) =>
                                    option.category_name === value.id
                                }
                                getOptionLabel={(option) =>
                                    option.category_name
                                }
                                options={categories}
                                loading={loading}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Category"
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <Fragment>
                                                    {loading ? (
                                                        <CircularProgress
                                                            color="inherit"
                                                            size={20}
                                                        />
                                                    ) : null}
                                                    {
                                                        params.InputProps
                                                            .endAdornment
                                                    }
                                                </Fragment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                id="asynchronous-demo"
                                getOptionSelected={(option, value) =>
                                    option.name === value.id
                                }
                                getOptionLabel={(option) => option.name}
                                options={brands}
                                loading={loading}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Brand"
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <Fragment>
                                                    {loading ? (
                                                        <CircularProgress
                                                            color="inherit"
                                                            size={20}
                                                        />
                                                    ) : null}
                                                    {
                                                        params.InputProps
                                                            .endAdornment
                                                    }
                                                </Fragment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid container xs={12} style={{ marginTop: '.4rem' }}>
                            <Grid container spacing={1}>
                                {products.map((product) => (
                                    <Grid item xs={3}>
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                backgroundColor: 'white',
                                                color: 'black',
                                            }}
                                        >
                                            <img
                                                src={`http://localhost:8000/${product.product_image}`}
                                                alt={product.product_name}
                                                border="3"
                                                height="45rem"
                                                fullWidth
                                                border="0"
                                            />
                                            <h6>{product.product_name}</h6>
                                            <h6>
                                                {product.price + 'tk (unit)'}
                                            </h6>
                                            <button
                                                type="button"
                                                onClick={() => addItem(product)}
                                                style={{
                                                    backgroundColor: '#02b573',
                                                    color: 'white',
                                                    margin: '0 0 5px',
                                                    boxShadow:
                                                        '2px 4px 8px 2px rgba(0, 0, 0, 0.2)',
                                                }}
                                            >
                                                {'Add to Cart'}
                                            </button>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </SimpleCard>
    )
}
