import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Supplier from '../pages/admin/Supplier';
import * as services from '../util/services'


test('renders loading', () => {
  render(
		<MemoryRouter>
			<Supplier />
		</MemoryRouter>
	);
	const titleValue = screen.getByText("Loading...");
	expect(titleValue).toBeInTheDocument();
});

test('makes API call', async () => {
	const mockFetchData = jest.spyOn(services, 'fetchData')
        .mockImplementation(async () => {
            return [{
                title: 'Toode'
            }];
		})

		render(
			<MemoryRouter>
				<Supplier />
			</MemoryRouter>
		);

		expect(mockFetchData).toHaveBeenCalled();

	// await waitFor(() => {
	// 		expect(screen.getByText(/kunal/i)).toBeInTheDocument();
	// })
});


test('stops loading after API call', async () => {
	jest.spyOn(services, 'fetchData')
        .mockImplementation(async () => {
            return [{
                title: 'Toode',
								rating: {
									rate: 5,
									count: 100
								}
            }];
		})

		render(
			<MemoryRouter>
				<Supplier />
			</MemoryRouter>
		);

		await waitFor(() => {
			const titleValue = screen.getByText("Toode");
			expect(titleValue).toBeInTheDocument();
		})
});
