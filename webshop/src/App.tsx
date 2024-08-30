import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import HomePage from './pages/global/HomePage'
import { ContactUs } from './pages/global/ContactUs';
import Shops from './pages/global/Shops';
import Cart from './pages/global/Cart';
import SingleProduct from './pages/global/SingleProduct';
import AdminHome from './pages/admin/AdminHome';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import MaintainProducts from './pages/admin/MaintainProducts';
import MaintainCategories from './pages/admin/MaintainCategories';
import MaintainShops from './pages/admin/MaintainShops';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import NotFound from './pages/global/NotFound';
import NavigationBar from './components/NavigationBar';
import BookSupplier from './pages/admin/BookSupplier';
import Supplier from './pages/admin/Supplier';
import { useContext } from 'react';
import { AuthContext } from './store/AuthContext';
import { Spinner } from 'react-bootstrap';
import HotToast from './components/HotToast';

function App() {
	const {loggedIn, fetching, error, setError} = useContext(AuthContext);
	const navigate = useNavigate();

	if (fetching === true) {
		return <Spinner />
	}

	if (error !== "") {
		alert(error);
		sessionStorage.clear();
		navigate("/");
		setError("");
	}

  return (
    <div className="App">

			<HotToast />
			<NavigationBar />
			
      <Routes>
				<Route path="" element={ <HomePage /> }></Route>
				<Route path="contact" element={ <ContactUs /> }></Route>
				<Route path="shops" element={ <Shops /> }></Route>
				<Route path="cart" element={ <Cart /> }></Route>
				<Route path="product/:title" element={ <SingleProduct /> }></Route>

				{loggedIn === true ?
				 <>
					<Route path="admin" element={ <AdminHome /> }></Route>
					<Route path="admin/add-product" element={ <AddProduct /> }></Route>
					<Route path="admin/edit-product/:qnr" element={ <EditProduct /> }></Route>
					<Route path="admin/maintain-products" element={ <MaintainProducts /> }></Route>
					<Route path="admin/maintain-categories" element={ <MaintainCategories /> }></Route>
					<Route path="admin/maintain-shops" element={ <MaintainShops /> }></Route>
					<Route path="admin/supplier" element={ <Supplier /> }></Route>
					<Route path="admin/book-supplier" element={ <BookSupplier /> }></Route>
				</> :
					<Route path="admin/*" element={ <Navigate to="/login" /> }></Route>
				}

				<Route path="login" element={ <Login /> }></Route>
				<Route path="signup" element={ <Signup /> }></Route>

				<Route path="*" element={ <NotFound /> }></Route>
			</Routes>
    </div>
  );
}

export default App;

// Taaskasutamine:
// HTMLi tahan taaskasutada ---> components kausta alamkomponendid
//		return (<div> 
//     <InfoCard text="Siia saab vajutada" btnText="Vajuta" /> 
//     <InfoCard text="Siit saad rohkem infot" btnText="Info" /> 
//			</div>)

// Funktsioonide taaskasutamiseks ---> util kaust
//    kokkuarvutus, impordin selle funktsiooni

// Kui tahan taaskasutada, ei taha HTMLi, aga tahan hooke kasutada
// Custom Hookid


// 23.07   9.00-11.15 (3ak/h)
// 25.07  13.00-16.15

// Redux
// TypeScript
// 10. Custom Hookid
// 11. useMemo   useCallback
// 11. re-renderdus
// 11. unit testid
// 12. Next.js ?
// 13. Trinidad/Wiseman proovitöö 
// 14. Contexti proovitöö
// 15. React Native
// 16.
// 17.
// 18. lõpuprojekti esitlemine

// Lõpuprojekt:
// vabalt valitud projekt endale sobival teemal.
// kohustusi pole.

// T
// R  11.15-12.15 --> vaatame proovitöid, arutame lõpuprojekti
// 1 nädala pärast
// 2 nädala pärast