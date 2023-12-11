import { Container } from "semantic-ui-react"
import NavBar from "./nav/NavBar"
import { Outlet } from "react-router-dom"
import ModalManager from "../common/modals/ModalManager"

function App() {

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
