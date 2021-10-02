import { Card, CardContent } from '@material-ui/core'
import Axios from 'axios'
import MaterialTable from 'material-table'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Breadcrumb } from '../../components'

export default function ManageCategory() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [counter, setCounter] = useState(0)

    const columns = [
        {
            title: 'Category ID',
            field: 'id',
            editable: 'never',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
        {
            title: 'Category Name',
            field: 'category_name',
            validate: (rowData) =>
                rowData.category_name === ''
                    ? 'Please enter category name.'
                    : rowData.category_name.length > 3
                    ? ''
                    : 'Category Name should be 3 character long.',
            cellStyle: {
                textAlign: 'center',
                fontSize: '1rem',
            },
        },
    ]

    useEffect(() => {
        async function fetchCategories() {
            if (counter > 1000) setCounter(0)
            try {
                setLoading(true)
                const res = await Axios.get(
                    'http://localhost:8000/api/categories'
                )
                if (res.data.status === 200) {
                    setCategories(res.data.categories)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err.response.data.errors)
            }
        }
        fetchCategories()
    }, [counter])

    const deleteCategory = async (category) => {
        try {
            const res = await Axios.get(
                `http://localhost:8000/api/category/delete/${category.id}`
            )
            if (res.data.status === 200) {
                console.log(res.data.message)
                setLoading(false)
            }
        } catch (err) {
            console.log(err.response.data.errors)
        }
    }

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Category', path: '/category/manageCategory' },
                        { name: 'Manage Category' },
                    ]}
                />
                <Card>
                    <CardContent
                        style={{
                            margin: '0 auto',
                            padding: '15px 35px',
                        }}
                    >
                        {!loading && (
                            <MaterialTable
                                style={{ textAlign: 'center' }}
                                title="Category Table"
                                data={categories}
                                columns={columns}
                                options={{
                                    actionsColumnIndex: -1,
                                    headerStyle: {
                                        backgroundColor: '#2abdf7',
                                        color: 'white',
                                        textAlign: 'center',
                                        fontSize: '1.15rem',
                                    },
                                }}
                                icons={{
                                    Add: (props) => (
                                        <div>
                                            <button
                                                style={{
                                                    padding: '7px 5px',
                                                    fontSize: '1.1rem',
                                                    borderRadius: '20px',
                                                    backgroundColor: '#910cc2',
                                                    boxShadow:
                                                        '2px 4px 8px 2px rgba(0, 0, 0, 0.2)',
                                                    color: 'white',
                                                }}
                                                onClick={() =>
                                                    history.push({
                                                        pathname:
                                                            '/category/addCategory',
                                                    })
                                                }
                                            >
                                                Add Category
                                                <span>
                                                    <i
                                                        className="material-ui-icon"
                                                        name="add_box"
                                                    ></i>
                                                </span>
                                            </button>
                                        </div>
                                    ),
                                }}
                                actions={[
                                    {
                                        icon: 'edit',
                                        color: 'secondary',
                                        tooltip: 'Edit Category',
                                        onClick: (e, rowData) => {
                                            const oldCategory = rowData
                                            history.push({
                                                pathname: '/category/edit',
                                                state: {
                                                    oldCategory,
                                                },
                                            })
                                        },
                                    },
                                ]}
                                editable={{
                                    onRowAdd: {},
                                    onRowDelete: (oldData) =>
                                        new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                deleteCategory(oldData)
                                                setCounter(
                                                    (prevCounter) =>
                                                        prevCounter + 1
                                                )
                                                resolve()
                                            }, 1000)
                                        }),
                                }}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
