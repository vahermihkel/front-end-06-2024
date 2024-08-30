// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import NavigationBar from '../components/NavigationBar';
// import { CartSumContext } from '../store/CartSumContext';
// import { AuthContext } from '../store/AuthContext';
 
// // Mock dependencies
// jest.mock('react-i18next');
// jest.mock('react-redux');
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: jest.fn(),
// }));
 
// const mockedUseTranslation = useTranslation as jest.MockedFunction<typeof useTranslation>;
// const mockedUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
// const mockedUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;
 
// describe('NavigationBar', () => {
//   beforeEach(() => {
//     mockedUseTranslation.mockReturnValue({
//       t: (key: string) => key,
//       i18n: { changeLanguage: jest.fn() },
//     });
 
//     mockedUseSelector.mockReturnValue(5);
//     mockedUseNavigate.mockReturnValue(jest.fn());
//   });
 
//   afterEach(() => {
//     jest.clearAllMocks();
//   });
 
//   const renderWithProviders = (loggedIn: boolean) => {
//     const setLoggedInMock = jest.fn();
//     const cartSumValue = 100;
 
//     return render(
//       <Router>
//         <AuthContext.Provider value={{ loggedIn, setLoggedIn: setLoggedInMock }}>
//           <CartSumContext.Provider value={{ cartSum: cartSumValue, setCartSum: jest.fn() }}>
//             <NavigationBar />
//           </CartSumContext.Provider>
//         </AuthContext.Provider>
//       </Router>
//     );
//   };
 
//   test('renders navigation bar correctly', () => {
//     renderWithProviders(true);
 
//     expect(screen.getByText('Webshop')).toBeInTheDocument();
//     expect(screen.getByText('nav.admin')).toBeInTheDocument();
//     expect(screen.getByText('nav.contact')).toBeInTheDocument();
//     expect(screen.getByText('nav.shops')).toBeInTheDocument();
//     expect(screen.getByText('nav.cart')).toBeInTheDocument();
//     expect(screen.getByText('nav.logout')).toBeInTheDocument();
//     expect(screen.getByText('5 /')).toBeInTheDocument();
//     expect(screen.getByText('100.00 €')).toBeInTheDocument();
//   });
 
//   test('changes language when language icon is clicked', () => {
//     renderWithProviders(true);
 
//     fireEvent.click(screen.getByAltText(''));
//     expect(mockedUseTranslation().i18n.changeLanguage).toHaveBeenCalledWith('en');
//     fireEvent.click(screen.getAllByAltText('')[1]);
//     expect(mockedUseTranslation().i18n.changeLanguage).toHaveBeenCalledWith('ee');
//   });
 
//   test('calls logout function when logout link is clicked', () => {
//     const { getByText } = renderWithProviders(true);
//     const logoutLink = getByText('nav.logout');
 
//     fireEvent.click(logoutLink);
//     expect(mockedUseNavigate()).toHaveBeenCalledWith('/');
//     expect(screen.getByText('nav.login')).toBeInTheDocument();
//   });
 
//   test('renders login and signup links when not logged in', () => {
//     renderWithProviders(false);
 
//     expect(screen.getByText('nav.login')).toBeInTheDocument();
//     expect(screen.getByText('nav.signup')).toBeInTheDocument();
//   });
 
//   test('navigates to the correct URL when nav links are clicked', () => {
//     const navigateMock = mockedUseNavigate();
//     renderWithProviders(true);
 
//     fireEvent.click(screen.getByText('nav.admin'));
//     expect(navigateMock).toHaveBeenCalledWith('/admin');
 
//     fireEvent.click(screen.getByText('nav.contact'));
//     expect(navigateMock).toHaveBeenCalledWith('/contact');
 
//     fireEvent.click(screen.getByText('nav.shops'));
//     expect(navigateMock).toHaveBeenCalledWith('/shops');
 
//     fireEvent.click(screen.getByText('nav.cart'));
//     expect(navigateMock).toHaveBeenCalledWith('/cart');
 
//     fireEvent.click(screen.getByText('nav.login'));
//     expect(navigateMock).toHaveBeenCalledWith('/login');
 
//     fireEvent.click(screen.getByText('nav.signup'));
//     expect(navigateMock).toHaveBeenCalledWith('/signup');
//   });
// });
