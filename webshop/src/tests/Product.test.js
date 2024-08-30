import { render, screen } from '@testing-library/react';
import Product from '../components/home/Product';
import { Product as ProductModel, Rating } from '../models/Product';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const mockProduct = new ProductModel(0, "Mens Casual Slim Fit", 0, "", "", "", false, new Rating(0,0))
const mockProduct2 = new ProductModel(0, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore", 0, "", "", "", false, new Rating(0,0))


test('renders product title', () => {
  render(
		<MemoryRouter>
			<Provider store={store}>
				<Product product={mockProduct} />
			</Provider>
		</MemoryRouter>
	);
	const titleValue = screen.getByText("Mens Casual Slim Fit").textContent;
	expect(titleValue).toBe(mockProduct.title)
});

test('renders product title and three dots', () => {
  render(
		<MemoryRouter>
			<Provider store={store}>
				<Product product={mockProduct2} />
			</Provider>
		</MemoryRouter>
	);
	const titleValue = screen.getByText("Lorem ipsum dolor sit amet, consectetur adipiscing...").textContent;
	expect(titleValue).toBe("Lorem ipsum dolor sit amet, consectetur adipiscing...")
});
 
// test('add item to localStorage', () => {
// 	render(
// 		<MemoryRouter>
// 			<Product />
// 		</MemoryRouter>
// 	);
// 	const lisaOstukorviButton = screen.getAllByText("Lisa ostukorvi")[0];
// 	fireEvent.click(lisaOstukorviButton);
// 	const LS = JSON.parse(localStorage.getItem('ostukorv'));
// 	const nobeName = LS[0].nimi;
 
// 	expect(nobeName).toBe('Nobe');
// });