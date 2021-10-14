import { CircularProgress, Grid, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import Axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import { SimpleCard } from '../../components'

export default function PointOfSale() {
    const [product, setProduct] = useState([])
    const [brands, setBrands] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [open, setOpen] = useState(false)

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

    const handleChange = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })

    }

    return (
        <SimpleCard>
            <Grid container>
                <Grid item xs={8}></Grid>
                <Grid item xs={4}>
                    <Grid container spacing={2}>
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
                                    option.category_name === value.id
                                }
                                getOptionLabel={(option) =>
                                    option.category_name
                                }
                                options={brands}
                                loading={loading}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Brand"
                                        fullWidth
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
                            <Autocomplete
                                className="mb-4"
                                options={suppliers}
                                getOptionLabel={(option) =>
                                    option.name +
                                    ' ( ' +
                                    option.shop_name +
                                    ' )'
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Category"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </SimpleCard>
    )
}
