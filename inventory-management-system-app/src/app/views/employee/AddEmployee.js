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

export default function AddEmployee() {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        photo: '',
        nid_no: '',
        experience: '',
        address: '',
        city: '',
        salary: '',
        vacation: '',
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const validate = (fieldValues = employee) => {
        let errorMessage = { ...errors }
        if ('name' in fieldValues) {
            errorMessage.name = !fieldValues.name
                ? 'Please enter employee name.'
                : fieldValues.name.length > 2
                ? ''
                : 'Employee Name should be 3 character long.'
        }
        if ('email' in fieldValues) {
            errorMessage.email = /$^|.+@.+..+/.test(fieldValues.email)
                ? ''
                : 'Email is not valid'
        }
        if ('nid_no' in fieldValues) {
            errorMessage.nid_no = !fieldValues.nid_no
                ? 'Please enter national id no.'
                : ''
        }
        if ('phone' in fieldValues) {
            errorMessage.phone = !fieldValues.phone
                ? 'Please enter phone number.'
                : fieldValues.phone.length != 11
                ? 'Phone number should 11 character long.'
                : ''
        }
        if ('salary' in fieldValues) {
            errorMessage.salary = !fieldValues.salary
                ? 'Please enter monthly salary.'
                : ''
        }
        if ('vacation' in fieldValues) {
            errorMessage.vacation = !fieldValues.vacation
                ? 'Please enter yearly vacation.'
                : ''
        }
        if ('experience' in fieldValues) {
            errorMessage.experience = !fieldValues.experience
                ? 'Please enter employee experience.'
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
        if ('photo' in fieldValues) {
            errorMessage.photo = !fieldValues.photo
                ? 'Please enter a photo.'
                : ''
        }
        setErrors({ ...errorMessage })
        if (fieldValues === employee) {
            return Object.values(errorMessage).every((x) => x === '')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'photo') {
            setEmployee({
                ...employee,
                [name]: e.target.files[0],
            })
        } else setEmployee({ ...employee, [name]: value })
        validate({ [name]: value })
    }

    const saveEmployee = async (e) => {
        e.preventDefault()
        const data = new FormData()
        Object.keys(employee).forEach((key) => data.append(key, employee[key]))
        if (validate()) {
            try {
                setLoading(true)
                console.log(employee)
                const res = await Axios.post(
                    'http://localhost:8000/api/employee/add',
                    data
                )
                if (res.data.status === 200) {
                    Object.keys(employee).forEach((key) => (employee[key] = ''))
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
                        { name: 'Employee', path: '/employee/addEmployee' },
                        { name: 'Add Employee' },
                    ]}
                />
            </div>
            <Card
                style={{
                    backgroundColor: '#212f52',
                    maxWidth: '750px',
                    margin: '0 auto',
                    padding: '20px 10px',
                    border: '5px solid',
                }}
            >
                <CardHeader
                    title="Add Employee"
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
                    <form onSubmit={saveEmployee} encType="multipart/form-data">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Employee Name"
                                    variant="outlined"
                                    name="name"
                                    value={employee['name']}
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
                                    value={employee['email']}
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
                                    label="National ID Number"
                                    variant="outlined"
                                    name="nid_no"
                                    style={{ margin: '.5rem 0' }}
                                    value={employee['nid_no']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.nid_no && {
                                        error: true,
                                        helperText: errors['nid_no'],
                                    })}
                                />
                                <TextField
                                    type="number"
                                    id="outlined-basic"
                                    label="Phone Number"
                                    variant="outlined"
                                    name="phone"
                                    style={{ margin: '.5rem 0' }}
                                    value={employee['phone']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.phone && {
                                        error: true,
                                        helperText: errors['phone'],
                                    })}
                                />
                                <TextField
                                    type="number"
                                    id="outlined-basic"
                                    label="Monthly Salary"
                                    variant="outlined"
                                    name="salary"
                                    style={{ margin: '.5rem 0' }}
                                    value={employee['salary']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.salary && {
                                        error: true,
                                        helperText: errors['salary'],
                                    })}
                                />
                                <TextField
                                    type="number"
                                    id="outlined-basic"
                                    label="Yearly Vcation"
                                    variant="outlined"
                                    name="vacation"
                                    style={{ margin: '.5rem 0' }}
                                    value={employee['vacation']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.vacation && {
                                        error: true,
                                        helperText: errors['vacation'],
                                    })}
                                />
                                <TextField
                                    type="textarea"
                                    rows={4}
                                    id="outlined-basic"
                                    label="Work Experience"
                                    variant="outlined"
                                    name="experience"
                                    style={{ margin: '.5rem 0' }}
                                    value={employee['experience']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.experience && {
                                        error: true,
                                        helperText: errors['experience'],
                                    })}
                                />
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="City"
                                    variant="outlined"
                                    name="city"
                                    style={{ margin: '.5rem 0' }}
                                    value={employee['city']}
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
                                    value={employee['address']}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.address && {
                                        error: true,
                                        helperText: errors['address'],
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
                                    required
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
