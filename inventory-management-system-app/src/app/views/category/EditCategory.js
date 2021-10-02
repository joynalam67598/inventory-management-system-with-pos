import { Button, Card, CardContent, Grid, TextField } from '@material-ui/core'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { Breadcrumb } from '../../components'

export default function EditCategory() {
    const history = useHistory()
    const { location } = history
    const { state } = location
    const { oldCategory } = state
    const [category, SetCategory] = useState({
        category_name: oldCategory.category_name,
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

    const updateCategory = async (e) => {
        e.preventDefault()
        if (validate()) {
            try {
                setLoading(true)
                category.id = oldCategory.id
                console.log(category)
                const res = await axios.post(
                    'http://localhost:8000/api/category/update',
                    category
                )
                console.log(res)
                if (res.data.status === 200) {
                    setLoading(false)
                    history.push({
                        pathname: '/category/manageCategory',
                    })
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
                        { name: 'Category', path: '/category/editCategory' },
                        {
                            name: 'Manage Category',
                            path: '/category/manageCategory',
                        },
                        { name: 'Edit Category' },
                    ]}
                />
            </div>
            <Card>
                <CardContent
                    style={{
                        maxWidth: '650px',
                        margin: '0 auto',
                        padding: '20px 10px',
                    }}
                >
                    <form onSubmit={updateCategory}>
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
                            <Grid item xs={12} className="text-right">
                                <Button
                                    disabled={loading}
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
