import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Select,
    TextField,
} from '@material-ui/core'
import Axios from 'axios'
import { useState } from 'react'
import { Breadcrumb } from '../../components'

export default function AddSupplier() {
    const [supplier, setSupplier] = useState({
        name: '',
        email: '',
        phone: '',
        photo: '',
        type: '',
        shop_name: '',
        account_holder: '',
        address: '',
        city: '',
        bank_branch: '',
        account_number: '',
        bank_name: '',
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const validate = (fieldValues = supplier) => {
        let errorMessage = { ...errors }
        if ('name' in fieldValues) {
            errorMessage.name = !fieldValues.name
                ? 'Please enter supplier name.'
                : fieldValues.name.length > 2
                ? ''
                : 'Supplier Name should be 3 character long.'
        }
        if ('email' in fieldValues) {
            errorMessage.email = /$^|.+@.+..+/.test(fieldValues.email)
                ? ''
                : 'Email is not valid'
        }
        if ('type' in fieldValues) {
            errorMessage.type = fieldValues.type
                ? ''
                : 'Please enter supplier type'
        }
        if ('phone' in fieldValues) {
            errorMessage.phone = !fieldValues.phone
                ? 'Please enter phone number.'
                : fieldValues.phone.length !== 11
                ? 'Phone number should 11 character long.'
                : ''
        }
        if ('city' in fieldValues) {
            errorMessage.city = !fieldValues.city
                ? 'Please enter city name.'
                : ''
        }
        if ('address' in fieldValues) {
            errorMessage.address = !fieldValues.address
                ? 'Please enter address.'
                : ''
        }
        if (
            'bank_name' in fieldValues ||
            'bank_branch' in fieldValues ||
            'account_number' in fieldValues ||
            'account_holder' in fieldValues
        ) {
            if ('bank_name' in fieldValues) {
                errorMessage.bank_name = !fieldValues.bank_name
                    ? 'Please enter bank name.'
                    : ''
            }
            if ('bank_branch' in fieldValues) {
                errorMessage.bank_branch = !fieldValues.bank_branch
                    ? 'Please enter branch name.'
                    : ''
            }
            if ('account_number' in fieldValues) {
                errorMessage.account_number = !fieldValues.account_number
                    ? 'Please enter account number.'
                    : ''
            }
            if ('account_holder' in fieldValues) {
                errorMessage.account_holder = !fieldValues.account_holder
                    ? 'Please enter account holder name.'
                    : ''
            }
        }

        setErrors({ ...errorMessage })
        if (fieldValues === supplier) {
            return Object.values(errorMessage).every((x) => x === '')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'photo') {
            setSupplier({
                ...supplier,
                [name]: e.target.files[0],
            })
        } else setSupplier({ ...supplier, [name]: value })
        validate({ [name]: value })
    }

    const saveSupplier = async (e) => {
        e.preventDefault()
        const supplierData = new FormData()
        Object.keys(supplier).forEach((key) =>
            supplierData.append(key, supplier[key])
        )
        if (validate()) {
            try {
                setLoading(true)
                const res = await Axios.post(
                    'http://localhost:8000/api/supplier/add',
                    supplierData
                )
                if (res.data.status === 200) {
                    Object.keys(supplier).forEach((key) => (supplier[key] = ''))
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
                        { name: 'Supplier', path: '/Supplier/addCoustomer' },
                        { name: 'Add Supplier' },
                    ]}
                />
            </div>
            <Card
                style={{
                    backgroundColor: '#212f52',
                    maxWidth: '750px',
                    margin: '0 auto',
                    padding: '0 10px 10px',
                    border: '5px solid',
                }}
            >
                <CardHeader
                    title="Add Supplier"
                    style={{
                        borderRadius: '10px',
                        textAlign: 'center',
                        color: 'white',
                    }}
                />

                <CardContent
                    style={{
                        backgroundColor: '#fcfdff',
                        borderRadius: '10px',
                        textAlign: 'center',
                    }}
                >
                    <form onSubmit={saveSupplier} encType="multipart/form-data">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Supplier Name"
                                    variant="outlined"
                                    name="name"
                                    value={supplier['name']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    style={{ margin: '.5rem 0' }}
                                    {...(errors.name && {
                                        error: true,
                                        helperText: errors['name'],
                                    })}
                                />
                                <TextField
                                    type="email"
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    name="email"
                                    style={{ margin: '.5rem 0' }}
                                    value={supplier['email']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.email && {
                                        error: true,
                                        helperText: errors['email'],
                                    })}
                                />
                                <TextField
                                    type="number"
                                    id="outlined-basic"
                                    label="Phone Number"
                                    variant="outlined"
                                    name="phone"
                                    style={{ margin: '.5rem 0' }}
                                    value={supplier['phone']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.phone && {
                                        error: true,
                                        helperText: errors['phone'],
                                    })}
                                />
                                {/* <FormControl
                                //     required
                                //     fullWidth
                                //     variant="outlined"
                                // >
                                //     <InputLabel htmlFor="supplierType">
                                //         {'Supplier Type'}
                                //     </InputLabel>*/}
                                <Select
                                    native
                                    style={{
                                        margin: '.5rem 0',
                                        textAlign: 'left',
                                    }}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    name="type"
                                    onChange={handleChange}
                                    value={supplier['type']}
                                    {...(errors.type && {
                                        error: true,
                                        helperText: errors['type'],
                                    })}
                                >
                                    <option value="" disabled>
                                        {'Please, select supplier type!'}
                                    </option>
                                    <option value="Distributor">
                                        {'Distributor'}
                                    </option>
                                    <option value="Wholeseller">
                                        {'Wholeseller'}
                                    </option>
                                    <option value="impoter">{'Impoter'}</option>
                                </Select>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="City"
                                    variant="outlined"
                                    name="city"
                                    style={{ margin: '.5rem 0' }}
                                    value={supplier['city']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.city && {
                                        error: true,
                                        helperText: errors['city'],
                                    })}
                                />
                                <TextField
                                    type="textarea"
                                    rows="4"
                                    id="outlined-basic"
                                    label="Address"
                                    variant="outlined"
                                    name="address"
                                    style={{ margin: '0.5rem 0' }}
                                    value={supplier['address']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.address && {
                                        error: true,
                                        helperText: errors['address'],
                                    })}
                                />
                                <TextField
                                    type="text"
                                    rows="4"
                                    id="outlined-basic"
                                    label="Shop Name"
                                    variant="outlined"
                                    name="shop_name"
                                    style={{ margin: '0.5rem 0' }}
                                    value={supplier['shop_name']}
                                    onChange={handleChange}
                                    fullWidth
                                    {...(errors.shop_name && {
                                        error: true,
                                        helperText: errors['shop_name'],
                                    })}
                                />
                                <TextField
                                    type="text"
                                    rows="4"
                                    id="outlined-basic"
                                    label="Bank Name"
                                    variant="outlined"
                                    name="bank_name"
                                    style={{ margin: '0.5rem 0' }}
                                    value={supplier['bank_name']}
                                    onChange={handleChange}
                                    fullWidth
                                    {...(errors.bank_name && {
                                        error: true,
                                        helperText: errors['bank_name'],
                                    })}
                                />
                                <TextField
                                    type="text"
                                    rows="4"
                                    id="outlined-basic"
                                    label="Account Holder Name"
                                    variant="outlined"
                                    name="account_holder"
                                    style={{ margin: '0.5rem 0' }}
                                    value={supplier['account_holder']}
                                    onChange={handleChange}
                                    fullWidth
                                    {...(errors.account_holder && {
                                        error: true,
                                        helperText: errors['account_holder'],
                                    })}
                                />
                                <TextField
                                    type="number"
                                    rows="4"
                                    id="outlined-basic"
                                    label="Account Number"
                                    variant="outlined"
                                    name="account_number"
                                    style={{ margin: '0.5rem 0' }}
                                    value={supplier['account_number']}
                                    onChange={handleChange}
                                    fullWidth
                                    {...(errors.account_number && {
                                        error: true,
                                        helperText: errors['account_number'],
                                    })}
                                />
                                <TextField
                                    type="text"
                                    rows="4"
                                    id="outlined-basic"
                                    label="Branch Name"
                                    variant="outlined"
                                    name="bank_branch"
                                    style={{ margin: '0.5rem 0' }}
                                    value={supplier['bank_branch']}
                                    onChange={handleChange}
                                    fullWidth
                                    {...(errors.bank_branch && {
                                        error: true,
                                        helperText: errors['bank_branch'],
                                    })}
                                />
                                <TextField
                                    type="file"
                                    accept="image/*"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="photo"
                                    style={{ margin: '0.5rem 0' }}
                                    onChange={handleChange}
                                    fullWidth
                                    {...(errors.photo && {
                                        error: true,
                                        helperText: errors['photo'],
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} className="text-right">
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
            </Card>
        </div>
    )
}
