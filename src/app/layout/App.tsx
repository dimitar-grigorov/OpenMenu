import { Container } from "semantic-ui-react"
import Dashboard from "../../features/events/dashboard/Dashboard"
import NavBar from "./nav/NavBar"

function App() {

  return (
    <>
      <NavBar />
      <Container className="main">
        <Dashboard />
      </Container>
    </>
  )
}

export default App
