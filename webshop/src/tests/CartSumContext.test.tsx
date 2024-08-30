import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { CartSumProvider, CartSumContext } from '../store/CartSumContext';
import { calculateCart, getCartWithProducts } from '../util/calculations';
import useFetchProducts from '../util/useFetchProducts';

// Mock dependencies
jest.mock('../util/calculations');
jest.mock('../util/useFetchProducts');


const mockedUseFetchProducts = useFetchProducts as jest.MockedFunction<any>;
const mockedCalculateCart = calculateCart as jest.MockedFunction<typeof calculateCart>;
const mockedGetCartWithProducts = getCartWithProducts as jest.MockedFunction<any>;

describe('CartSumProvider', () => {
  beforeEach(() => {
    mockedUseFetchProducts.mockReturnValue({ products: [] });
    mockedCalculateCart.mockReturnValue(0);
    mockedGetCartWithProducts.mockReturnValue([]);
    localStorage.setItem('cart', JSON.stringify([{ productId: 1, quantity: 2 }]));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders provider and calculates cart sum', async () => {
    mockedUseFetchProducts.mockReturnValue({ products: [{ id: 1, price: 100 }] });
    mockedGetCartWithProducts.mockReturnValue([{ productId: 1, quantity: 2, product: { id: 1, price: 100 } }]);
    mockedCalculateCart.mockReturnValue(200);

    const TestComponent = () => {
      const { cartSum } = React.useContext(CartSumContext);
      return <div>Cart Sum: {cartSum}</div>;
    };

    render(
      <CartSumProvider>
        <TestComponent />
      </CartSumProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Cart Sum: 200/i)).toBeInTheDocument();
    });

    expect(mockedUseFetchProducts).toHaveBeenCalled();
    expect(mockedGetCartWithProducts).toHaveBeenCalledWith([{ productId: 1, quantity: 2 }], [{ id: 1, price: 100 }]);
    expect(mockedCalculateCart).toHaveBeenCalledWith([{ productId: 1, quantity: 2, product: { id: 1, price: 100 } }]);
  });

  test('updates cart sum when products change', async () => {
    const { rerender } = render(
      <CartSumProvider>
        <div>Test Component</div>
      </CartSumProvider>
    );

    mockedUseFetchProducts.mockReturnValue({ products: [{ id: 2, price: 150 }] });
    mockedGetCartWithProducts.mockReturnValue([{ productId: 1, quantity: 2, product: { id: 2, price: 150 } }]);
    mockedCalculateCart.mockReturnValue(300);

    rerender(
      <CartSumProvider>
        <div>Test Component</div>
      </CartSumProvider>
    );

    await waitFor(() => {
      expect(mockedCalculateCart).toHaveBeenCalledWith([{ productId: 1, quantity: 2, product: { id: 2, price: 150 } }]);
    });

    const TestComponent = () => {
      const { cartSum } = React.useContext(CartSumContext);
      return <div>Cart Sum: {cartSum}</div>;
    };

    render(
      <CartSumProvider>
        <TestComponent />
      </CartSumProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Cart Sum: 300/i)).toBeInTheDocument();
    });
  });

  test('handles empty cart gracefully', async () => {
    localStorage.setItem('cart', JSON.stringify([]));

    render(
      <CartSumProvider>
        <div>Test Component</div>
      </CartSumProvider>
    );

    await waitFor(() => {
      expect(mockedCalculateCart).toHaveBeenCalledWith([]);
    });

    const TestComponent = () => {
      const { cartSum } = React.useContext(CartSumContext);
      return <div>Cart Sum: {cartSum}</div>;
    };

    render(
      <CartSumProvider>
        <TestComponent />
      </CartSumProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Cart Sum: 0/i)).toBeInTheDocument();
    });
  });
});