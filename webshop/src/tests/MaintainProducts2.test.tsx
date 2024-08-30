import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MaintainProducts from '../pages/admin/MaintainProducts';
import useFetchProducts from '../util/useFetchProducts';
import { BrowserRouter as Router } from 'react-router-dom';
import toast from 'react-hot-toast';

// Mocking dependencies
jest.mock('../util/useFetchProducts');
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
}));

const mockedUseFetchProducts = useFetchProducts as jest.MockedFunction<typeof useFetchProducts>;

describe('MaintainProducts', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description 1',
      category: 'Category 1',
      price: 100,
      rating: { rate: 4, count: 20 },
      image: 'image1.jpg',
      active: true,
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description 2',
      category: 'Category 2',
      price: 200,
      rating: { rate: 5, count: 10 },
      image: 'image2.jpg',
      active: false,
    },
  ];

  beforeEach(() => {
    mockedUseFetchProducts.mockReturnValue({
      products: mockProducts,
      productsDefault: [...mockProducts], // sama mis mockProducts.slice()
      loading: false,
      setProducts: jest.fn(),
      url: process.env.REACT_APP_PRODUCTS_DB_URL
    });
  });

  test('renders maintain products component', () => {
    render(
      <Router>
        <MaintainProducts />
      </Router>
    );

    expect(screen.getByText(/Maintain products/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
  });

  test('searches for products', () => {
    render(
      <Router>
        <MaintainProducts />
      </Router>
    );

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'Product 1' } });

    expect(mockedUseFetchProducts().setProducts).toHaveBeenCalledWith([
      mockProducts[0],
    ]);
  });

  test('removes a product', async () => {
    render(
      <Router>
        <MaintainProducts />
      </Router>
    );

    const removeButton = screen.getAllByText(/Remove/i)[0];
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.getByTestId("modal-id")).toBeInTheDocument();
      // expect(mockedUseFetchProducts().setProducts).toHaveBeenCalled();
      // expect(toast.success).toHaveBeenCalledWith('Product removed');
    });
  });

  test('displays loading spinner', () => {
    mockedUseFetchProducts.mockReturnValueOnce({
      products: [],
      productsDefault: [],
      loading: true,
      setProducts: jest.fn(),
      url: process.env.REACT_APP_PRODUCTS_DB_URL
    });

    render(
      <Router>
        <MaintainProducts />
      </Router>
    );

    const spinnerElement = screen.getByTestId("spinner-id")

    expect(spinnerElement).toBeInTheDocument();
  });
});