import React from 'react'; // これを追加
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Bottom from '../components/Bottom';
import SearchPage from '../pages/SearchPage';
import SchedulePage from '../pages/SchedulePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Bottom />}>
        <Route index element={<HomePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/schedule' element={<SchedulePage />} />
      </Route>
    </>
  )
);

export default router;
