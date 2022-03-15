import React from 'react';
import {Routes, Route} from 'react-router-dom'

import Lobby from './pages/Lobby';
import Friends from './pages/Friends';
import RoomDetail from './pages/RoomDetail';
import RoomList from './pages/RoomList';
import SeeMore from './pages/SeeMore';



function App() {
  return (
    <Routes>
      <Route index element={<Lobby />}/>
      <Route path='/friends' element={<Friends />} />
      <Route path='/rooms' element={<RoomDetail />} />
      <Route path='/rooms/:roomId' element={<RoomList />} />
      <Route path='/more' element={<SeeMore />} />
    </Routes>
  );
}

export default App;
