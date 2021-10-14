import {
    Button,
    CardContent,
    CardHeader,
    FormControl,
    Grid,
    InputLabel,
    Select,
    TextField,
} from '@material-ui/core'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Breadcrumb, SimpleCard } from '../../components'

export default function EditBrand() {
    const history = useHistory()
    const { location } = history
    const { state } = location
    const { oldBrandData } = state
    const [brand, setBrand] = useState(oldBrandData)
    const [categories, setCategories] = useState([])
    const [suppliers, setSuppliers] = useState([])
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
                if (res1.data.status === 200) {
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
            errorMessage.name = fieldValues.name
                ? 'Please enter brand name.'
                : fieldValues.category_name.length > 3
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

    const updateBrand = async (e) => {
        e.preventDefault()
        if (validate()) {
            try {
                setLoading(true)
                console.log(brand)
                const res = await Axios.post(
                    'http://localhost:8000/api/brand/update',
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
                        title="Pay Advance Salary"
                        style={{
                            borderRadius: '10px',
                            textAlign: 'center',
                            color: 'white',
                        }}
                    />

                    <form onSubmit={updateBrand}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor="advanceSalarymonth">
                                        {'Employee'}
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
                                        value={brand['sup_id']}
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
                                                {supplier.name +
                                                    ' ( ' +
                                                    supplier.shop_name +
                                                    ' )'}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
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
                                    {...(errors.brand && {
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
