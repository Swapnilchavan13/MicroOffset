import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar } from './Component/Navbar';
import { Homepage } from './Component/Homepage';
import { OffsetPacks } from './Component/OffsetPacks';
import { Businesses } from './Component/Businesses';
import { Institutions } from './Component/Institutions';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/packs" element={<OffsetPacks />} />
    <Route path="/business" element={<Businesses />} />
    <Route path="/institutions" element={<Institutions />} />


  </Routes>
</BrowserRouter>

  );
}

export default App;
