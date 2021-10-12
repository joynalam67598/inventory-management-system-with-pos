import {
    Button,
    CardContent,
    CardHeader,
    Grid,
    TextField,
} from '@material-ui/core'
import axios from 'axios'
import { useState } from 'react'
import { Breadcrumb, SimpleCard } from '../../components'

export default function AddCategory() {
    const [category, SetCategory] = useState({
        category_name: '',
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const validate = (fieldValues = category) => {
        let errorMessage = { ...errors }
        if ('category_name' in fieldValues) {
            errorMessage.category_name = !fieldValues.category_name
                ? 'Please enter category name.'
                : fieldValues.category_name.length > 3
                ? ''
                : 'Category Name should be 3 character long.'
        }
        setErrors({ ...errorMessage })
        if (fieldValues === category) {
            return Object.values(errorMessage).every((x) => x === '')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        SetCategory({ ...SetCategory, [name]: value })
        validate({ [name]: value })
    }

    const saveCategory = async (e) => {
        e.preventDefault()
        if (validate()) {
            try {
                setLoading(true)
                const res = await axios.post(
                    'http://localhost:8000/api/category/add',
                    category
                )
                if (res.data.status === 200) {
                    setLoading(false)
                    SetCategory({ category_name: '' })
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
                        { name: 'Category', path: '/category/addCategory' },
                        { name: 'Add Category' },
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
                        title="Add Category"
                        style={{
                            borderRadius: '10px',
                            textAlign: 'center',
                            color: 'white',
                        }}
                    />
                    <form onSubmit={saveCategory}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Category Name"
                                    variant="outlined"
                                    name="category_name"
                                    value={category['category_name']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.category_name && {
                                        error: true,
                                        helperText: errors['category_name'],
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
