import {
    Button,
    ButtonGroup,
    Card,
    CardMedia,
    Chip,
    CircularProgress,
    Grid,
    TextField
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import Axios from 'axios'
import MaterialTable, { MTableToolbar } from 'material-table'
import { Fragment, useEffect, useReducer, useState } from 'react'
import { useCart } from 'react-use-cart'

const initialState = null

const reducer = (state, action) => {
    switch (action.type) {
        case 'set':
            let newCategories = []
            newCategories.push({
                id: 'all',
                category_name: 'All Categories',
            })
            action.value.map((category) => {
                newCategories.push(category)
            })
            return newCategories
        default:
            return state
    }
}

export default function PointOfSale() {
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])
    const [brand, setBrand] = useState([])
    const [customers, setCustomers] = useState([])
    const [categories, dispatch] = useReducer(reducer, initialState)
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const [cartData, setCartData] = useState({
        tax: '',
        promo_code: '',
        discont: '',
    })
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
        async function fetchAllData() {
            try {
                setLoading(true)
                const res1 = await Axios.get('http://localhost:8000/api/brands')
                const res2 = await Axios.get(
                    'http://localhost:8000/api/categories'
                )
                const res3 = await Axios.get(
                    'http://localhost:8000/api/customers'
                )
                const res4 = await Axios.get(
                    'http://localhost:8000/api/products'
                )
                if (
                    res1.data.status === 200 &&
                    res2.data.status === 200 &&
                    res4.data.status === 200 &&
                    res3.data.status === 200
                ) {
                    setBrands(res1.data.brands)
                    dispatch({
                        type: 'set',
                        value: res2.data.categories,
                    })
                    setCustomers(res3.data.customers)
                    setProducts(res4.data.products)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err.response.data.errors)
                setLoading(false)
            }
        }
        fetchAllData()
    }, [])

    useEffect(() => {
        async function fetchProductsByCategory() {
            try {
                let res = null
                if (category === 'all') {
                    res = await Axios.get(`http://localhost:8000/api/products`)
                } else {
                    res = await Axios.get(
                        `http://localhost:8000/api/products/category/${category}`
                    )
                }
                if (res.data.status === 200) {
                    setProducts(res.data.products)
                }
            } catch (err) {
                console.log(err.response.data.errors)
            }
        }
        fetchProductsByCategory()
    }, [category])

    useEffect(() => {
        async function fetchProductsByCategory() {
            try {
                const res = await Axios.get(
                    `http://localhost:8000/api/products/category/brand/${category}/${brand}`
                )
                console.log(res)
                if (res.data.status === 200) {
                    setProducts(res.data.products)
                }
            } catch (err) {
                console.log(err.response.data.errors)
            }
        }
        fetchProductsByCategory()
    }, [brand])

    const handleChange = (e) => {
        const { name, value } = e.target
        setCartData({ ...cartData, [name]: value })
    }

    const columns = [
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
                    alt={item.product_name}
                    height="40rem"
                    width="55rem"
                    border="0"
                />
            ),
            cellStyle: {
                textAlign: 'center',
            },
        },
        {
            title: 'Name',
            field: 'product_name',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Unit price (tk)',
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
            title: 'Net Price (tk)',
            render: (item) => item.quantity * item.price,
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
    ]

    return (
        <Card>
            <Grid container>
                <Grid
                    item
                    style={{
                        padding: '15px 15px 5px 5px',
                    }}
                    sm={12}
                    md={8}
                >
                    <Grid container spacing={1}>
                        <Grid item sm={6}>
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
                        <Grid item sm={2}>
                            <Button
                                style={{
                                    padding: '5px 5px',
                                    fontSize: '1rem',
                                    borderRadius: '5px',
                                    backgroundColor: '#0acf4f',
                                    color: 'white',
                                }}
                                fullWidth
                            >
                                {'Add Customer'}
                            </Button>
                        </Grid>
                        <Grid item sm={2}>
                            <Button
                                onClick={() => emptyCart()}
                                style={{
                                    padding: '5px 5px',
                                    fontSize: '1rem',
                                    borderRadius: '5px',
                                    backgroundColor: '#ad0e36',
                                    color: 'white',
                                }}
                                fullWidth
                            >
                                {'Clear Cart'}
                            </Button>
                        </Grid>
                        <Grid item sm={2}>
                            <Button
                                style={{
                                    padding: '5px 5px',
                                    fontSize: '1rem',
                                    borderRadius: '5px',
                                    backgroundColor: '#d119e9',
                                    color: 'white',
                                }}
                                fullWidth
                            >
                                {'Checkout'}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialTable
                            style={{
                                padding: '10px 0px 0px',
                            }}
                            title="Cart"
                            data={items}
                            columns={columns}
                            options={{
                                actionsColumnIndex: -1,
                                pageSize: 10,
                                maxBodyHeight: '420px',
                                headerStyle: {
                                    backgroundColor: '#031f4f',
                                    color: 'white',
                                    textAlign: 'center',
                                    fontSize: '.9rem',
                                },
                            }}
                            editable={{
                                onRowDelete: (oldData) =>
                                    new Promise((resolve, reject) => {
                                        removeItem(oldData.id)
                                        resolve()
                                    }),
                            }}
                            components={{
                                Toolbar: (props) => (
                                    <div>
                                        <MTableToolbar {...props} />
                                        <div style={{ padding: '0px 10px' }}>
                                            <Chip
                                                label={
                                                    'Unique Items : ' +
                                                    totalUniqueItems
                                                }
                                                color="secondary"
                                                style={{ marginRight: 5 }}
                                            />
                                            <Chip
                                                label={
                                                    'Total Items : ' +
                                                    totalItems
                                                }
                                                color="secondary"
                                                style={{ marginRight: 5 }}
                                            />
                                            <Chip
                                                label={
                                                    'Total : ' +
                                                    cartTotal +
                                                    ' tk'
                                                }
                                                color="secondary"
                                                style={{ marginRight: 5 }}
                                            />
                                        </div>
                                    </div>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid container>
                        <form>
                            <Grid
                                container
                                spacing={1}
                                style={{ padding: '2px 10px 2px 0px' }}
                            >
                                <Grid item xs={9}>
                                    <TextField
                                        type="text"
                                        id="outlined-basic"
                                        label="Promo Code/Gift Card"
                                        variant="outlined"
                                        name="promo_code"
                                        size="small"
                                        style={{ margin: '0.5rem 0' }}
                                        value={cartData['promo_code']}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        // {...(errors.price && {
                                        //     error: true,
                                        //     helperText: errors['price'],
                                        // })}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Button
                                        type="submit"
                                        style={{
                                            marginTop: '8px',
                                            fontSize: '.9rem',
                                            borderRadius: '5px',
                                            backgroundColor: '#d119e9',
                                            color: 'white',
                                        }}
                                        fullWidth
                                    >
                                        {'Apply'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                cartTotal = (
                                    cartTotal -
                                    (cartTotal * cartData['discont']) / 100
                                ).toFixed(2)
                            }}
                        >
                            <Grid
                                container
                                spacing={1}
                                style={{ padding: '2px 10px 2px 0px' }}
                            >
                                <Grid item xs={9}>
                                    <TextField
                                        type="number"
                                        id="outlined-basic"
                                        label="Discount (%)"
                                        variant="outlined"
                                        name="discount"
                                        size="small"
                                        style={{ margin: '0.5rem 0' }}
                                        value={cartData['discount']}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Button
                                        type="submit"
                                        style={{
                                            marginTop: '8px',
                                            fontSize: '.9rem',
                                            borderRadius: '5px',
                                            backgroundColor: '#d119e9',
                                            color: 'white',
                                        }}
                                        fullWidth
                                    >
                                        {'Apply'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                cartTotal = (
                                    cartTotal +
                                    (cartTotal * cartData['tax']) / 100
                                ).toFixed(2)
                            }}
                        >
                            <Grid
                                container
                                spacing={1}
                                style={{ padding: '2px 0px' }}
                            >
                                <Grid item xs={9}>
                                    <TextField
                                        type="number"
                                        id="outlined-basic"
                                        label="Tax (%)"
                                        variant="outlined"
                                        name="tax"
                                        size="small"
                                        style={{ margin: '0.5rem 0' }}
                                        value={cartData['tax']}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Button
                                        type="submit"
                                        style={{
                                            marginTop: '8px',
                                            fontSize: '.9rem',
                                            borderRadius: '5px',
                                            backgroundColor: '#d119e9',
                                            color: 'white',
                                        }}
                                        fullWidth
                                    >
                                        {'Apply'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
                <Grid
                    item
                    sm={12}
                    md={4}
                    style={{
                        padding: '10px 5px 5px 5px',
                    }}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Autocomplete
                                id="asynchronous-demo"
                                getOptionLabel={(option) =>
                                    option.category_name
                                }
                                options={categories}
                                loading={loading}
                                onChange={(e, option) => setCategory(option.id)}
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
                                getOptionLabel={(option) => option.name}
                                options={brands}
                                loading={loading}
                                onChange={(e, option) => setBrand(option.id)}
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
                        <Grid
                            container
                            xs={12}
                            style={{ marginTop: '.4rem', height: '100%' }}
                        >
                            <Grid container spacing={1}>
                                {products.map((product) => (
                                    <Grid item xs={3}>
                                        <Card
                                            style={{
                                                textAlign: 'center',
                                                backgroundColor: '#575aff',
                                            }}
                                            onClick={() => addItem(product)}
                                            s
                                        >
                                            <CardMedia
                                                component="img"
                                                image={`http://localhost:8000/${product.product_image}`}
                                                height="85"
                                                alt={product.product_name}
                                            />
                                            <p style={{ fontSize: '.9rem' }}>
                                                {product.product_name}
                                            </p>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Card>
                        <Grid
                            container
                            spacing={1}
                            style={{ paddingTop: '15px' }}
                        ></Grid>
                    </Card>
                </Grid>
            </Grid>
        </Card>
    )
}
