import React from 'react'
import { MatxLayouts } from './index'
import {MatxSuspense} from "../index";
import useSettings from '../../hooks/useSettings'

const MatxLayout = (props) => {
    const { settings } = useSettings()
    const Layout = MatxLayouts[settings.activeLayout]

    return (
        <MatxSuspense>
            <Layout {...props} />
        </MatxSuspense>
    )
}

export default MatxLayout
