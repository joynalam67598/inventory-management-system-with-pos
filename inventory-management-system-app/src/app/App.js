import React from 'react'
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom'
import AppContext from './contexts/AppContext'
import history from './history'
import routes from './RootRoutes'
import { GlobalCss, MatxSuspense, MatxTheme, MatxLayout } from './components'
import sessionRoutes from './sessions/SessionRoutes'
import { SettingsProvider } from './contexts/SettingsContext'

const App = () => {
  return (
      <AppContext.Provider value={{ routes }}>
          <SettingsProvider>
            <MatxTheme>
              <GlobalCss />
              <BrowserRouter basename={process.env.PUBLIC_URL}>
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
