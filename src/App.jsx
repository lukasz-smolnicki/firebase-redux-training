import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Reset from './pages/auth/Reset'
import Home from './pages/Home'
import Secret from './pages/protected/Secret'

import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './configs/firebaseConfig'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux'
import { saveUser } from './redux/slice/authSlice'
import ProtectedRoute from './utils/ProtectedRoute'
function App() {
  initializeApp(firebaseConfig)
  const auth = getAuth()
  const user = useSelector((state) => state.auth.value)
  console.log('user from state', user)
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user.refreshToken))
      } else {
        dispatch(saveUser(undefined))
      }
    })
  }, [auth, dispatch])

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/reset'>Reset password</Link>
          </li>
          <li>
            <Link to='/protected'>Protected page</Link>
          </li>
          <li>
            <Link
              to='#'
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log('user signed out')
                  })
                  .catch((error) => {
                    console.log('error', error)
                  })
              }}
            >
              Log out
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/reset' element={<Reset />} />
        <Route exact path='/protected' element={<Secret />} />

        <Route exact path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
