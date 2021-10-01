import React from 'react'
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom'
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
            </SettingsProvider>
        </AppContext.Provider>
    )
}

export default App
