import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import NoteState from './Context/noteState';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/about" element={<About/>} />
              <Route exact path="/contact" element={<Contact/>} />
            </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
