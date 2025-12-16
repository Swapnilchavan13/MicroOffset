import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar } from './Component/Navbar';
import { Homepage } from './Component/Homepage';
import { OffsetPacks } from './Component/OffsetPacks';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/packs" element={<OffsetPacks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
