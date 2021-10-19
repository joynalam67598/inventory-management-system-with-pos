import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom'
import { CartProvider } from 'react-use-cart'
import { GlobalCss, MatxLayout, MatxSuspense, MatxTheme } from './components'
import AppContext from './contexts/AppContext'
import { SettingsProvider } from './contexts/SettingsContext'
import history from './history'
import routes from './RootRoutes'
import sessionRoutes from './sessions/SessionRoutes'

const App = () => {
    return (
        <AppContext.Provider value={{ routes }}>
            <SettingsProvider>
                <CartProvider>
                    <MatxTheme>
                        <GlobalCss />
                        <BrowserRouter>
                            <Router history={history}>
                                <MatxSuspense>
                                    <Switch>
                                        {/* AUTHENTICATION PAGES (SIGNIN, SIGNUP ETC.) */}
                                        {sessionRoutes.map((item, i) => (
                                            <Route
                                                key={i}
                                                path={item.path}
                                                component={item.component}
                                            />
                                        ))}
                                        <MatxLayout />{' '}
                                    </Switch>
                                </MatxSuspense>
                            </Router>
                        </BrowserRouter>
                    </MatxTheme>
                </CartProvider>
            </SettingsProvider>
        </AppContext.Provider>
    )
}

export default App
