import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import useSettings from '../../hooks/useSettings'
import MatxCssVars from './MatxCssVars'

// import cssVars from "css-vars-ponyfill";

const MatxTheme = ({ children }) => {
    const { settings } = useSettings()
    let activeTheme = { ...settings.themes[settings.activeTheme] }
    // console.log(activeTheme)
    // cssVars();
    // activeTheme.direction = settings.direction;
    return (
        <ThemeProvider theme={activeTheme}>
            <CssBaseline />
            <MatxCssVars> {children} </MatxCssVars>
        </ThemeProvider>
    )
}

export default MatxTheme
