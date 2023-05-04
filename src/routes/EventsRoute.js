import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Events from '../pages/events';
import Create from '../pages/events/create';

export function EventsRoute() {
  return (
    <Routes>
      <Route path='/' element={<Events />} />
      <Route path='/create' element={<Create />} />
    </Routes>
  );
};
