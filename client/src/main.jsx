import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
import './index.css';
// import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { RouterProvider } from 'react-router-dom';
import AppRouter from './routes/AppRouter';

ReactDOM.createRoot(document.getElementById('root')).render(
	// <BrowserRouter>
	<AuthContextProvider>
		<RouterProvider router={<AppRouter />} />
		{/* <App /> */}
	</AuthContextProvider>
	// </BrowserRouter>
);
