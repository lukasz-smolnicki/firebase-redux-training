import { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebaseConfig'

function App() {
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [user, setUser] = useState({})

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  const register = async (e) => {
    e.preventDefault()
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }
  console.log(auth)
  return (
    <>
      <form>
        <input type="text" onChange={(e) => { setRegisterEmail(e.target.value) }} />
        <input type="text" onChange={(e) => { setRegisterPassword(e.target.value) }} />
        <button onClick={register}>create user</button>
      </form>
      {user ? user.email : null}
    </>
  )
}

export default App;
