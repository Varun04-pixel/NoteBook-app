import Navbar from './Components/Navbar';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import NoteState from './Context/noteState';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Defaultpage from './Components/Defaultpage';
import Alert from './Components/Alert';
import VantaBackground from './Components/VantaBackground';
import ScrollHandler from './Components/ScrollHandler';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [alert, setAlert] = useState({
    isAlert: false,
    msg: "",
    color: ""
  })
  return (
    <>
      <NoteState>
        <Router>
          <ScrollHandler />
          <VantaBackground />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setAlert={setAlert} />
            <Alert alert={alert} setAlert={setAlert} />
            <Routes>
              <Route exact path="/" element={<Defaultpage />} />
              <Route exact path="/home" element={<Home setLoggedIn={setLoggedIn} setAlert={setAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/login" element={<Login setLoggedIn={setLoggedIn} setAlert={setAlert} />} />
              <Route exact path="/signup" element={<Signup setLoggedIn={setLoggedIn} setAlert={setAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
