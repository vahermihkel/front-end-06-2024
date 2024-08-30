import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { CartSumContext } from '../store/CartSumContext';
import { AuthContext } from '../store/AuthContext';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store'

function NavigationBar() {
	const { t, i18n } = useTranslation();
	const { cartSum } = useContext(CartSumContext);
	const { loggedIn, setLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();

	const count = useSelector((state: RootState) => state.cartCount.value)

	const changeLang = (newLang: string) => {
		i18n.changeLanguage(newLang);
		localStorage.setItem("language", newLang);
	}

	const logout = () => {
		setLoggedIn(false);
		sessionStorage.removeItem("idToken");
		sessionStorage.removeItem("refreshToken");
		navigate("/");
	}
	
	return (
		<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						{loggedIn === true && <Nav.Link as={Link} to="/admin">{t("nav.admin")}</Nav.Link>}
						<Nav.Link as={Link} to="/contact">{t("nav.contact")}</Nav.Link>
						<Nav.Link as={Link} to="/shops">{t("nav.shops")}</Nav.Link>
						<Nav.Link as={Link} to="/cart">{t("nav.cart")}</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link>{count} / </Nav.Link>
						<Nav.Link>{cartSum.toFixed(2)} €</Nav.Link>
						{loggedIn === false && <Nav.Link as={Link} to="/login">{t("nav.login")}</Nav.Link>}
						{loggedIn === false && <Nav.Link as={Link} to="/signup">{t("nav.signup")}</Nav.Link>}
						{loggedIn === true && <Nav.Link onClick={logout}>{t("nav.logout")}</Nav.Link>}
						<img className="lang" onClick={()=> changeLang("en")} src="/english.png" alt="" />
						<img className="lang" onClick={() => changeLang("ee")} src="/estonian.png" alt="" />
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavigationBar;