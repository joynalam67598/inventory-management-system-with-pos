import { Card, CardContent } from '@material-ui/core'
import Axios from 'axios'
import MaterialTable from 'material-table'
import { useEffect, useState } from 'react'
import { Breadcrumb } from '../../components'

export default function ManageCategory() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const columns = [
        { title: 'Serial', field: 'id', editable: 'never' },
        {
            title: 'Category Name',
            field: 'cat_name',
        },
    ]

    useEffect(() => {
        async function fetchCategories() {
            try {
                setLoading(true)
                const res = await Axios.get(
                    'http://localhost:8000/api/categories'
                )
                console.log(res)
                if (res.data.status === 200) {
                    setCategories(res.data.categories)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchCategories()
    }, [])
    console.log(categories)

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
                            padding: '20px 10px',
                        }}
                    >
                        {!loading && (
                            <MaterialTable
                                title="Category Table"
                                data={categories}
                                columns={columns}
                                options={{
                                    export: true,
                                    grouping: true,
                                    filtering: true,
                                }}
                                editable={{
                                    onRowAdd: (newData) =>
                                        new Promise((resolve, reject) => {
                                            setTimeout(() => {
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
