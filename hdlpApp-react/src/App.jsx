import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParentsView from './pages/ParentsView';
import ChildsView from './pages/ChildsView';
import WashingHands from './pages/lessons/WashingHands';
import MakingBed from './pages/lessons/MakingBed';
import MakingFriend from './pages/lessons/MakingFriend';
import FineGrossMotorSkills from './pages/lessons/FineGrossMotorSkills';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParentsView />} />
        <Route path="/childs_view" element={<ChildsView />} />
        <Route path="/washing_hands" element={<WashingHands />} />
        <Route path="/making_bed" element={<MakingBed />} />
        <Route path="/making_friend" element={<MakingFriend />} />
        <Route path="/fine_gross_motor_skills" element={<FineGrossMotorSkills />} />
      </Routes>
    </Router>
  );
}

export default App;
