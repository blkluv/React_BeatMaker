import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from '../View/MainPage';
import TutorialView from '../View/Tutorial';
import EntradaView from '../View/Entrada';


function App() {
  return (
    <>
      <BrowserRouter  basename='/React_BeatMaker/'>
          <Routes>
              <Route path="/"
              Component={EntradaView}/>
              <Route path="/BeatMaker"
              Component={MainPage}/>
              <Route path="/Tutorial"
              Component={TutorialView}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App