import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField,
} from '@material-ui/core'
import Axios from 'axios'
import { useState } from 'react'
import { Breadcrumb } from '../../components'

export default function AddCustomer() {
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        photo: '',
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

    const validate = (fieldValues = customer) => {
        let errorMessage = { ...errors }
        if ('name' in fieldValues) {
            errorMessage.name = !fieldValues.name
                ? 'Please enter Customer name.'
                : fieldValues.name.length > 2
                ? ''
                : 'Customer Name should be 3 character long.'
        }
        if ('email' in fieldValues) {
            errorMessage.email = /$^|.+@.+..+/.test(fieldValues.email)
                ? ''
                : 'Email is not valid'
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
        if (fieldValues === customer) {
            return Object.values(errorMessage).every((x) => x === '')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'photo') {
            setCustomer({
                ...customer,
                [name]: e.target.files[0],
            })
        } else setCustomer({ ...customer, [name]: value })
        validate({ [name]: value })
    }

    const saveCustomer = async (e) => {
        e.preventDefault()
        const customerData = new FormData()
        Object.keys(customer).forEach((key) =>
            customerData.append(key, customer[key])
        )
        if (validate()) {
            try {
                setLoading(true)
                console.log(customer)
                const res = await Axios.post(
                    'http://localhost:8000/api/customer/add',
                    customerData
                )
                if (res.data.status === 200) {
                    Object.keys(customer).forEach((key) => (customer[key] = ''))
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
                        { name: 'Customer', path: '/customer/addCoustomer' },
                        { name: 'Add Customer' },
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
                    title="Add Customer"
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
                    <form onSubmit={saveCustomer} encType="multipart/form-data">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Customer Name"
                                    variant="outlined"
                                    name="name"
                                    value={customer['name']}
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
                                    value={customer['email']}
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
                                    value={customer['phone']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.phone && {
                                        error: true,
                                        helperText: errors['phone'],
                                    })}
                                />
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="City"
                                    variant="outlined"
                                    name="city"
                                    style={{ margin: '.5rem 0' }}
                                    value={customer['city']}
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
                                    value={customer['address']}
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
                                    value={customer['shop_name']}
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
                                    value={customer['bank_name']}
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
                                    value={customer['account_holder']}
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
                                    value={customer['account_number']}
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
                                    value={customer['bank_branch']}
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
