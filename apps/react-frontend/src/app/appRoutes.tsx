// import FixturesPage from "./pages/fixtures-page/fixtures-page";
import React, { useEffect } from 'react';
import { FixturesPage } from './pages/fixtures-page/fixtures-page';


const appRoutes = [
  {
    navName: 'fixtures',
    path: '/fixtures',
    component: FixturesPage,
  },
];

export default appRoutes;
