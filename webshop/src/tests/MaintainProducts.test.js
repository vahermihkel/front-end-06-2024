import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Supplier from '../pages/admin/Supplier';
import * as services from '../util/services'

test('loads products', async () => {
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