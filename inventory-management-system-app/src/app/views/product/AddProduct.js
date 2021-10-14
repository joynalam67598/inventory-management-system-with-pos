import DateFnsUtils from '@date-io/date-fns'
import {
    Button,
    CardContent,
    CardHeader,
    FormControl,
    Grid,
    InputLabel,
    Select,
    TextField
} from '@material-ui/core'
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { Breadcrumb, SimpleCard } from '../../components'

export default function AddProduct() {
    const [product, setProduct] = useState({
        cat_id: '',
        sup_id: '',
        product_name: '',
        product_code: '',
        product_garage: '',
        product_route: '',
        product_image: '',
        buy_date: new Date(),
        expire_date: new Date(),
        buying_price: '',
        selling_price: '',
    })
    const [suppliers, setSuppliers] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        async function fetchSuppliersAndCategoris() {
            try {
                setLoading(true)
                const res1 = await Axios.get(
                    'http://localhost:8000/api/suppliers'
                )
                const res2 = await Axios.get(
                    'http://localhost:8000/api/categories'
                )
                if (res1.data.status === 200 && res2.data.status === 200) {
                    setSuppliers(res1.data.suppliers)
                    setCategories(res2.data.categories)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err.response.data.errors)
                setLoading(false)
            }
        }
        fetchSuppliersAndCategoris()
    }, [])

    const validate = (fieldValues = product) => {
        let errorMessage = { ...errors }
        if ('product_name' in fieldValues) {
            errorMessage.product_name = !fieldValues.product_name
                ? 'Please enter product name.'
                : fieldValues.product_name.length > 2
                ? ''
                : 'Product Name should be 3 character long.'
        }
        if ('product_code' in fieldValues) {
            errorMessage.product_code = !fieldValues.product_code
                ? 'Please enter product code.'
                : ''
        }
        if ('cat_id' in fieldValues) {
            errorMessage.cat_id = !fieldValues.cat_id
                ? 'Please select a category.'
                : ''
        }
        if ('sup_id' in fieldValues) {
            errorMessage.sup_id = !fieldValues.sup_id
                ? 'Please select supplier name.'
                : ''
        }
        if ('product_garage' in fieldValues) {
            errorMessage.product_garage = !fieldValues.product_garage
                ? 'Please enter product garage address.'
                : ''
        }
        if ('product_route' in fieldValues) {
            errorMessage.product_route = !fieldValues.product_route
                ? 'Please enter product route.'
                : ''
        }
        if ('product_image' in fieldValues) {
            errorMessage.product_image = !fieldValues.product_image
                ? 'Please choose a product image.'
                : ''
        }
        if ('account_number' in fieldValues) {
            errorMessage.account_number = !fieldValues.account_number
                ? 'Please enter account number.'
                : ''
        }
        if ('buy_date' in fieldValues) {
            errorMessage.buy_date = !fieldValues.buy_date
                ? 'Please enter select buying date.'
                : ''
        }
        if ('expire_date' in fieldValues) {
            errorMessage.expire_date = !fieldValues.expire_date
                ? 'Please enter select expire date.'
                : ''
        }
        if ('buying_price' in fieldValues) {
            errorMessage.buying_price = !fieldValues.buying_price
                ? 'Please enter buying price.'
                : ''
        }
        if ('selling_price' in fieldValues) {
            errorMessage.selling_price = !fieldValues.selling_price
                ? 'Please enter selling price.'
                : ''
        }

        setErrors({ ...errorMessage })
        if (fieldValues === product) {
            return Object.values(errorMessage).every((x) => x === '')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'product_image') {
            setProduct({
                ...product,
                [name]: e.target.files[0],
            })
        } else setProduct({ ...product, [name]: value })
        validate({ [name]: value })
    }

    const saveProduct = async (e) => {
        e.preventDefault()
        if (validate()) {
           
            const productData = new FormData()
            Object.keys(product).forEach((key) => {
                    productData.append(key, product[key])
            })
            try {
                setLoading(true)
                const res = await Axios.post(
                    'http://localhost:8000/api/product/add',
                    productData
                )
                if (res.data.status === 200) {
                    Object.keys(product).forEach((key) => {
                        if (key.includes('date')) product[key] = new Date()
                        else product[key] = ''
                    })
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
                        { name: 'Product', path: '/addProduct' },
                        { name: 'Add Product' },
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
                    <CardHeader
                        title="Add Product"
                        style={{
                            borderRadius: '10px',
                            textAlign: 'center',
                            color: '#5871fc',
                        }}
                    />
                    <form onSubmit={saveProduct} encType="multipart/form-data">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Product Name"
                                    variant="outlined"
                                    name="product_name"
                                    value={product['product_name']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    style={{ margin: '.5rem 0' }}
                                    {...(errors.product_name && {
                                        error: true,
                                        helperText: errors['product_name'],
                                    })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Product Code"
                                    variant="outlined"
                                    name="product_code"
                                    style={{ margin: '.5rem 0' }}
                                    value={product['product_code']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.product_code && {
                                        error: true,
                                        helperText: errors['product_code'],
                                    })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor="category">
                                        {'Category'}
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
                                        name="cat_id"
                                        onChange={handleChange}
                                        value={product['cat_id']}
                                        {...(errors.cat_id && {
                                            error: true,
                                            helperText: errors['cat_id'],
                                        })}
                                    >
                                        <option disabled />
                                        {categories.map((category) => (
                                            <option
                                                value={category.id}
                                                key={category.id}
                                            >
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor="supplier">
                                        {'Supplier'}
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
                                        name="sup_id"
                                        onChange={handleChange}
                                        value={product['sup_id']}
                                        {...(errors.sup_id && {
                                            error: true,
                                            helperText: errors['sup_id'],
                                        })}
                                    >
                                        <option disabled />
                                        {suppliers.map((supplier) => (
                                            <option
                                                value={supplier.id}
                                                key={supplier.id}
                                            >
                                                {'Name : ' +
                                                    supplier.name +
                                                    ', ' +
                                                    'Shop : ' +
                                                    supplier.shop_name}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    multiline
                                    maxRows={5}
                                    id="outlined-basic"
                                    label="Product Godown"
                                    variant="outlined"
                                    name="product_garage"
                                    value={product['product_garage']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    style={{ margin: '.5rem 0' }}
                                    {...(errors.product_garage && {
                                        error: true,
                                        helperText: errors['product_garage'],
                                    })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Product Route"
                                    variant="outlined"
                                    name="product_route"
                                    style={{ margin: '.5rem 0' }}
                                    value={product['product_route']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.product_route && {
                                        error: true,
                                        helperText: errors['product_route'],
                                    })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        autoOk
                                        variant="inline"
                                        inputVariant="outlined"
                                        label="Buying Date"
                                        format="dd/MM/yyyy"
                                        maxDate={new Date()}
                                        name="buy_date"
                                        required
                                        style={{ margin: '0.5rem 0' }}
                                        value={product['buy_date']}
                                        autoOk={true}
                                        fullWidth
                                        onChange={(date) => {
                                            setProduct({
                                                ...product,
                                                ['buy_date']: date,
                                            })
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        autoOk
                                        variant="inline"
                                        inputVariant="outlined"
                                        label="Expire Date"
                                        format="dd/MM/yyyy"
                                        minDate={new Date()}
                                        name="expire_date"
                                        required
                                        style={{ margin: '0.5rem 0' }}
                                        value={product['expire_date']}
                                        autoOk={true}
                                        fullWidth
                                        onChange={(date) =>
                                            setProduct({
                                                ...product,
                                                ['expire_date']: date,
                                            })
                                        }
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="number"
                                    rows="4"
                                    id="outlined-basic"
                                    label="Buying Price"
                                    variant="outlined"
                                    name="buying_price"
                                    style={{ margin: '0.5rem 0' }}
                                    value={product['buying_price']}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    {...(errors.buying_price && {
                                        error: true,
                                        helperText: errors['buying_price'],
                                    })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="number"
                                    rows="4"
                                    id="outlined-basic"
                                    label="Selling Price"
                                    variant="outlined"
                                    name="selling_price"
                                    style={{ margin: '0.5rem 0' }}
                                    value={product['selling_price']}
                                    required
                                    onChange={handleChange}
                                    fullWidth
                                    {...(errors.selling_price && {
                                        error: true,
                                        helperText: errors['selling_price'],
                                    })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="file"
                                    accept="image/*"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="product_image"
                                    style={{ margin: '0.5rem 0' }}
                                    onChange={handleChange}
                                    fullWidth
                                    {...(errors.product_image && {
                                        error: true,
                                        helperText: errors['product_image'],
                                    })}
                                />
                            </Grid>
                            <Grid item xs={6} className="text-right">
                                <Button
                                    disabled={loading}
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    style={{
                                        fontSize: '1.6rem',
                                        marginTop: '5px',
                                        padding: '5px',
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
