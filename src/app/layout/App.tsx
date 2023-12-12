import { Container } from "semantic-ui-react"
import NavBar from "./nav/NavBar"
import { Outlet } from "react-router-dom"
import ModalManager from "../common/modals/ModalManager"
import { useAppDispatch } from "../store/store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { logout, signIn } from "../../features/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, {
      next: user => {
        if (user) {
          dispatch(signIn(user))
        } else {
          dispatch(logout())
        }
      },
      error: error => console.log(error),
      complete: () => { }
    })
  }, [dispatch])

  return (
    <>
      <ModalManager />
      <NavBar />
      <Container className="main">
        <Outlet />
      </Container>
    </>
  )
}

export default App
