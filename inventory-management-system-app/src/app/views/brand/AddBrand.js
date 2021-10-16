import {
    Button,
    CardContent,
    CardHeader,
    CircularProgress,
    Grid,
    TextField,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import Axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import { Breadcrumb, SimpleCard } from '../../components'

export default function AddBrand() {
    const [brand, setBrand] = useState({
        sup_id: '',
        cat_id: '',
        name: '',
    })
    const [suppliers, setSuppliers] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        async function fetchBrandsAndSuppliers() {
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
        fetchBrandsAndSuppliers()
    }, [])

    const validate = (fieldValues = brand) => {
        let errorMessage = { ...errors }
        if ('sup_id' in fieldValues) {
            errorMessage.sup_id = !fieldValues.sup_id
                ? 'Please select a supplier.'
                : ''
        }
        if ('cat_id' in fieldValues) {
            errorMessage.cat_id = !fieldValues.cat_id
                ? 'Please select a category.'
                : ''
        }
        if ('name' in fieldValues) {
            errorMessage.name = !fieldValues.name
                ? 'Please enter brand name.'
                : fieldValues.name.length > 3
                ? ''
                : 'Brand Name should be 3 character long.'
        }
        setErrors({ ...errorMessage })
        if (fieldValues === brand) {
            return Object.values(errorMessage).every((x) => x === '')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setBrand({ ...brand, [name]: value })
        validate({ [name]: value })
    }

    const saveBrand = async (e) => {
        e.preventDefault()
        if (validate()) {
            try {
                setLoading(true)
                const res = await Axios.post(
                    'http://localhost:8000/api/brand/add',
                    brand
                )
                if (res.data.status === 200) {
                    Object.keys(brand).forEach((key) => (brand[key] = ''))
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
                            name: 'Brand',
                            path: '/addBrand',
                        },
                        { name: 'Add Brand' },
                    ]}
                />
            </div>
            <SimpleCard>
                <CardContent
                    style={{
                        backgroundColor: '#191a38',
                        borderRadius: '10px',
                        textAlign: 'center',
                        border: '2px solid #425df5',
                    }}
                >
                    <CardHeader
                        title="Add Brand"
                        style={{
                            borderRadius: '10px',
                            textAlign: 'center',
                            color: 'white',
                        }}
                    />

                    <form onSubmit={saveBrand}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    getOptionLabel={(option) =>
                                        option.category_name
                                    }
                                    getOptionValue={(option) => option.id}
                                    style={{ margin: '.8rem 0' }}
                                    name="cat_id"
                                    onChange={(e, option) =>
                                        setBrand({
                                            ...brand,
                                            cat_id: option.id,
                                        })
                                    }
                                    options={categories}
                                    loading={loading}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Category"
                                            fullWidth
                                            variant="outlined"
                                            required
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
                                <Autocomplete
                                    getOptionLabel={(option) =>
                                        option.name +
                                        ' ( ' +
                                        option.shop_name +
                                        ' )'
                                    }
                                    getoptionValue={(option) => option.id}
                                    name="sup_id"
                                    style={{ margin: '.8rem 0' }}
                                    options={suppliers}
                                    loading={loading}
                                    onChange={(e, option) =>
                                        setBrand({
                                            ...brand,
                                            sup_id: option.id,
                                        })
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Supplier"
                                            fullWidth
                                            variant="outlined"
                                            required
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
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Brand Name"
                                    variant="outlined"
                                    name="name"
                                    value={brand['name']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.name && {
                                        error: true,
                                        helperText: errors['name'],
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
