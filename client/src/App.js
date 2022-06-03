import './App.css'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './components/NavBar'
import HomeScreen from './screens/HomeScreen'
import CartScreen from './screens/CartScreen'
import Register from './screens/Register'
import Login from './screens/Login'

import AdminScreen from './screens/AdminScreen'
import Footer from './components/Footer'
import { useSelector } from 'react-redux'

function App() {
  const user = useSelector((state) => state.loginUserReducer.currentUser)
  console.log(user)
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route
          path='/admin'
          component={user ? user.isAdmin && AdminScreen : <Redirect to='/' />}
        ></Route>

        <Route path='/login' component={Login} exact />
        <Route path='/register' component={Register} exact />
        <Route path='/cart' exact>
          {user ? !user.isAdmin && <CartScreen /> : <Redirect to='/' />}
        </Route>
        <Route path='/'>
          {user ? (
            user.isAdmin ? (
              <Redirect to='/admin' />
            ) : (
              <HomeScreen />
            )
          ) : (
            <Redirect to='/login' />
          )}
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
