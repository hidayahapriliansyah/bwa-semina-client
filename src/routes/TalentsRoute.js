import { Routes, Route } from 'react-router-dom';
import Talents from '../pages/talents';

export function TalentsRoute() {
  return (
    <Routes>
      <Route path='/' element={<Talents />} />
    </Routes>
  );
};