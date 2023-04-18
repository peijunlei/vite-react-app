import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { config as AmapReactConfig } from '@amap/amap-react';

import App from './App'
import ErrorPage from "./error-page";
import AMap from './pages/gaode-map'
import './index.css'
import Home from './pages/home';
import LazyImage from './pages/lazy-image';

AmapReactConfig.version = '2.0'; // 默认2.0，这里可以不修改
AmapReactConfig.key = import.meta.env.VITE_AMAP_KEY;
AmapReactConfig.plugins = [
];
const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
    errorElement: <ErrorPage />,
    children:[
      {
        path: "/map",
        element:<AMap />,
      },
      {
        path: "/home",
        element:<Home />,
      },
      {
        path: "/lazy-image",
        element:<LazyImage />,
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
