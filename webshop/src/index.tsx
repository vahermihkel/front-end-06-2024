import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './index.css';
import './i18n';
import App from './App';

import { BrowserRouter } from "react-router-dom";
import { CartSumProvider } from './store/CartSumContext';
import { AuthProvider } from './store/AuthContext';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<BrowserRouter>
		<React.StrictMode>
			<CartSumProvider>
				<AuthProvider>
					<Provider store={store}>
						<App />
					</Provider>
				</AuthProvider>
			</CartSumProvider>
			</React.StrictMode>
	</BrowserRouter>
);
