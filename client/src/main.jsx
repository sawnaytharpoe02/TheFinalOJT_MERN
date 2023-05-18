import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
import './index.css';
// import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';

ReactDOM.createRoot(document.getElementById('root')).render(
	// <BrowserRouter>
	<AuthContextProvider>
		<RouterProvider router={router} />
		{/* <App /> */}
	</AuthContextProvider>
	// </BrowserRouter>
);
