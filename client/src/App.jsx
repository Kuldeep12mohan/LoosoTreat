import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Game from "./pages/Game"
import Lobby from "./pages/Lobby"
import Signup from "./pages/Signup"
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/home"element={<Home/>}></Route>
        <Route path="/lobby/:id" element={<Lobby/>}></Route>
        <Route path="/game" element={<Game/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
